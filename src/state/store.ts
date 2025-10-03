
import { create } from 'zustand'
import type { Player, Role } from '../game/types'
import abilities from '../data/abilities.json'
// Match engine removed
import { applyTraining, projectTraining } from '../game/training'
import type { TrainingId, TrainingIntensity, HomeTrainingId, GymTrainingId, SchoolTrainingId, StadiumTrainingId } from '../game/training'
import type { SkillLevel } from '../game/types'

// Helper function to add skill points and handle level ups
function addSkillPoints(skill: SkillLevel, points: number): { skill: SkillLevel; leveledUp: boolean; levelsGained: number } {
  let newPoints = skill.points + points
  let newLevel = skill.level
  let levelsGained = 0
  
  while (newPoints >= 100) {
    newPoints -= 100
    newLevel += 1
    levelsGained += 1
  }
  
  return {
    skill: { level: newLevel, points: newPoints },
    leveledUp: levelsGained > 0,
    levelsGained
  }
}

type Screen = 'HUB'|'EVENT';
type UIState = { screen: Screen; setScreen: (s:Screen)=>void };
export const useUI = create<UIState>((set)=>({ screen:'HUB', setScreen:(s)=>set({screen:s}) }))

const basePlayer: Player = {
  id:'p1', name:'You', age:17, role:'RW' as Role,
  core:{ 
    pace:{level:3, points:25}, strength:{level:2, points:0}, technique:{level:3, points:18}, 
    vision:{level:2, points:55}, defense:{level:2, points:45} 
  },
  sec:{ 
    shooting:{level:2, points:55}, passing:{level:2, points:52}, dribbling:{level:3, points:10}, 
    marking:{level:2, points:45}, stamina:{level:3, points:10}, positioning:{level:2, points:50} 
  },
  hidden:{ confidence:50, morale:50, discipline:50, chemistry:{level:1, points:30}, reputation:10, injuryRisk:5, coachTrust:20, fans:5, sponsors:0, fun:70 },
  hunger:80, energy:90, xp:0, traits:[]
}

// Match state removed

type GameState = {
  player: Player; week: number; day: number; money: number;
  train: (id: TrainingId)=>void;
  nextEvent: ()=>void;
  nextDay: ()=>void;
  trainingIntensity: TrainingIntensity;
  setTrainingIntensity: (i: TrainingIntensity)=>void;
  trainingCounts: Record<string, number>; // Legacy system, keeping for compatibility
  restDay: ()=>void;
  physio: ()=>void;
  previewTraining: (id: TrainingId)=> ReturnType<typeof projectTraining>;
  isTraining: boolean;
  trainingProgress: number; // 0..100
  lastTrainingSummary?: { id: TrainingId; intensity: TrainingIntensity; deltas: any; trustDelta?: number; } | null;
  eatMeal: ()=>void;
  drink: ()=>void;
  // Time-of-day system (0..1439 minutes)
  timeMinutes: number; // replaces days; can be shown as HH:MM
  advanceTime: (mins:number)=>void;
  // Match system removed
  // Continuous loops
  activeTraining?: TrainingId | null;
  trainingElapsedMinutes: number;
  startTrainingLoop: (id: TrainingId)=>void;
  stopTrainingLoop: ()=>void;
  lastTrainingTick?: { hungerCost: number; energyDrain: number; gains: string[]; losses: string[] } | null;
  addTimelineEvent: (type: string, message: string, effects: string[]) => void;
  // Track hours per training type today
  trainingHoursToday: Record<string, number>;
  isSleeping: boolean;
  startSleep: ()=>void;
  stopSleep: ()=>void;
  // Locations
  location: 'HOME'|'GYM'|'SCHOOL'|'STADIUM'|'SHOP';
  travelTo: (loc: 'HOME'|'GYM'|'SCHOOL'|'STADIUM'|'SHOP')=>void;
  buyMeal: ()=>void;
  buyDrink: ()=>void;
  buyBoots: ()=>void;
  // Home storage
  homePantry: { meals: number; drinks: number };
  // Timeline/History system
  timeline: Array<{ timestamp: string; type: string; message: string; effects: string[] }>;
}

export const useGame = create<GameState>((set,get)=> ({
  player: basePlayer,
  week:1, day:1, money: 200,
  timeMinutes: 8*60, // start at 08:00
  location: 'HOME',
  trainingIntensity: 'normal',
  setTrainingIntensity: (i)=> set({ trainingIntensity: i }),
  trainingCounts: { sprint:0, gym:0, shooting:0, tactics:0, team:0 },
  isTraining: false,
  trainingProgress: 0,
  lastTrainingSummary: null,
  homePantry: { meals: 0, drinks: 0 },
  timeline: [],
  advanceTime: (mins)=>{
    const t = get().timeMinutes
    const total = (t + mins) % (24*60)
    set({ timeMinutes: total })
  },
  activeTraining: null,
  trainingElapsedMinutes: 0,
  lastTrainingTick: null,
  trainingHoursToday: { 
    // Home
    jogging:0, juggling:0, pushups:0, footage:0, friends:0,
    // Gym  
    weights:0, conditioning:0,
    // School
    shooting:0, tactics:0, coaching:0, position:0,
    // Stadium
    scrimmage:0, chemistry:0
  },
  startTrainingLoop: (id)=>{
    const s = get()
    if (s.isTraining || s.isSleeping) return
    
    // Check location requirements
    const homeActivities: TrainingId[] = ['jogging', 'juggling', 'pushups', 'footage', 'friends']
    const gymActivities: TrainingId[] = ['weights', 'conditioning'] 
    const schoolActivities: TrainingId[] = ['shooting', 'tactics', 'coaching', 'position']
    const stadiumActivities: TrainingId[] = ['scrimmage', 'chemistry']
    
    if (homeActivities.includes(id) && s.location !== 'HOME') {
      alert('This activity can only be done at home.'); return
    }
    if (gymActivities.includes(id) && s.location !== 'GYM') {
      alert('This activity requires the gym. Go to Gym.'); return
    }
    if (schoolActivities.includes(id) && s.location !== 'SCHOOL') {
      alert('This activity requires school facilities. Go to School.'); return
    }
    if (stadiumActivities.includes(id) && s.location !== 'STADIUM') {
      alert('This activity requires professional team training. Go to Stadium.'); return
    }
    
    if ((s.player as any).hunger <= 0) { alert('You are out of calories. Go home to eat a meal.'); return }
    if (s.player.energy <= 0) { alert('You are exhausted. Go home to sleep.'); return }
    set({ isTraining:true, activeTraining:id })
    const tick = () => {
      const st = get()
      if (!st.isTraining || st.activeTraining !== id) return
      const p = { ...st.player, core: { ...st.player.core }, hidden: { ...st.player.hidden }, sec: { ...st.player.sec } }
      let intensity = st.trainingIntensity
      if (intensity === 'intense' && p.hidden.coachTrust < 40) intensity = 'normal'
      
      // Intensity multipliers for both gains and costs
      const intensityMultiplier = intensity==='light'?0.5:intensity==='normal'?1.0:1.5  // Light 50%, Normal 100%, Intense 150%
      
      // Per hour tick costs (calorie burn mapping) - balanced with same multipliers as gains
      const baseHunger = 12
      const baseEnergy = 8
      const hungerCost = Math.round(baseHunger * intensityMultiplier)  // 6/12/18
      const energyDrain = Math.round(baseEnergy * intensityMultiplier)  // 4/8/12
      
      // Stop if resources gone
      if ((p as any).hunger <= 0 || p.energy <= 0) { set({ isTraining:false, activeTraining:null, lastTrainingTick:null }); return }
      
      // Track gains and losses for this tick (all applied at end)
      const gains: string[] = []
      const losses: string[] = [`Hunger -${hungerCost}`, `Energy -${energyDrain}`]
      
      // Diminishing returns based on hours of THIS training type done today
      // Hour 1: 100%, Hour 2: 75%, Hour 3: 50%, Hour 4: 25%, Hour 5+: 0%
      const hoursOfThisTraining = st.trainingHoursToday[id]
      const diminishFactor = hoursOfThisTraining >= 4 ? 0 : (1 - (hoursOfThisTraining * 0.25))
      
      // Calculate all gains for this hour (now in skill points) - intensity affects gains
      
      // Apply training effects based on activity type
      switch(id){
        // HOME ACTIVITIES
        case 'jogging': {
          const basePoints = Math.round(8 * intensityMultiplier) // 4/8/12 points
          const points = Math.round(basePoints * diminishFactor)
          const staminaResult = addSkillPoints(p.sec.stamina, points)
          p.sec.stamina = staminaResult.skill
          p.hidden.fun = Math.max(0, p.hidden.fun - 5) // Boring
          if (staminaResult.leveledUp) {
            gains.push(`Stamina: Level ${staminaResult.skill.level}! (+${points}pts)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          } else {
            gains.push(`Stamina +${points}pts (${staminaResult.skill.points}/100)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          }
          gains.push('Fun -5')
          break;
        }
        case 'juggling': {
          const basePoints = Math.round(6 * intensityMultiplier) // 3/6/9 points
          const points = Math.round(basePoints * diminishFactor)
          const techResult = addSkillPoints(p.core.technique, points)
          p.core.technique = techResult.skill
          p.hidden.fun = Math.min(100, p.hidden.fun + 3) // Slightly fun
          if (techResult.leveledUp) {
            gains.push(`Technique: Level ${techResult.skill.level}! (+${points}pts)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          } else {
            gains.push(`Technique +${points}pts (${techResult.skill.points}/100)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          }
          gains.push('Fun +3')
          break;
        }
        case 'pushups': {
          const basePoints = Math.round(5 * intensityMultiplier) // 3/5/8 points
          const points = Math.round(basePoints * diminishFactor)
          const strengthResult = addSkillPoints(p.core.strength, points)
          p.core.strength = strengthResult.skill
          p.hidden.fun = Math.max(0, p.hidden.fun - 8) // Not fun
          if (strengthResult.leveledUp) {
            gains.push(`Strength: Level ${strengthResult.skill.level}! (+${points}pts)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          } else {
            gains.push(`Strength +${points}pts (${strengthResult.skill.points}/100)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          }
          gains.push('Fun -8')
          break;
        }
        case 'footage': {
          const basePoints = Math.round(4 * intensityMultiplier) // 2/4/6 points
          const points = Math.round(basePoints * diminishFactor)
          const visionResult = addSkillPoints(p.core.vision, points)
          p.core.vision = visionResult.skill
          p.hidden.fun = Math.max(0, p.hidden.fun - 3) // Slightly boring
          if (visionResult.leveledUp) {
            gains.push(`Vision: Level ${visionResult.skill.level}! (+${points}pts)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          } else {
            gains.push(`Vision +${points}pts (${visionResult.skill.points}/100)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          }
          gains.push('Fun -3')
          break;
        }
        case 'friends': {
          const basePoints = Math.round(6 * intensityMultiplier) // 3/6/9 points
          const points = Math.round(basePoints * diminishFactor)
          const dribblingResult = addSkillPoints(p.sec.dribbling, points)
          p.sec.dribbling = dribblingResult.skill
          p.hidden.fun = Math.min(100, p.hidden.fun + 15) // Very fun!
          p.hidden.confidence = Math.min(100, p.hidden.confidence + 2)
          if (dribblingResult.leveledUp) {
            gains.push(`Dribbling: Level ${dribblingResult.skill.level}! (+${points}pts)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          } else {
            gains.push(`Dribbling +${points}pts (${dribblingResult.skill.points}/100)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          }
          gains.push('Fun +15', 'Confidence +2')
          break;
        }
        
        // GYM ACTIVITIES (at Stadium for now)
        case 'weights': {
          const basePoints = Math.round(12 * intensityMultiplier) // 6/12/18 points
          const points = Math.round(basePoints * diminishFactor)
          const strengthResult = addSkillPoints(p.core.strength, points)
          p.core.strength = strengthResult.skill
          p.hidden.fun = Math.max(0, p.hidden.fun - 10) // Not fun
          const injuryRisk = intensity==='light'?0:intensity==='normal'?1:2
          p.hidden.injuryRisk = Math.min(100, p.hidden.injuryRisk + injuryRisk)
          if (strengthResult.leveledUp) {
            gains.push(`Strength: Level ${strengthResult.skill.level}! (+${points}pts)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          } else {
            gains.push(`Strength +${points}pts (${strengthResult.skill.points}/100)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          }
          gains.push('Fun -10')
          if (injuryRisk > 0) gains.push(`Injury Risk +${injuryRisk}`)
          break;
        }
        case 'shooting': {
          const basePoints = Math.round(10 * intensityMultiplier) // 5/10/15 points
          const points = Math.round(basePoints * diminishFactor)
          const shootingResult = addSkillPoints(p.sec.shooting, points)
          p.sec.shooting = shootingResult.skill
          p.hidden.fun = Math.min(100, p.hidden.fun + 5) // Somewhat fun
          if (shootingResult.leveledUp) {
            gains.push(`Shooting: Level ${shootingResult.skill.level}! (+${points}pts)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          } else {
            gains.push(`Shooting +${points}pts (${shootingResult.skill.points}/100)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          }
          gains.push('Fun +5')
          break;
        }
        case 'conditioning': {
          const basePoints = Math.round(10 * intensityMultiplier) // 5/10/15 points
          const points = Math.round(basePoints * diminishFactor)
          const staminaResult = addSkillPoints(p.sec.stamina, points)
          const paceResult = addSkillPoints(p.core.pace, Math.round(points * 0.5))
          p.sec.stamina = staminaResult.skill
          p.core.pace = paceResult.skill
          p.hidden.fun = Math.max(0, p.hidden.fun - 12) // Very boring
          if (staminaResult.leveledUp) {
            gains.push(`Stamina: Level ${staminaResult.skill.level}! (+${points}pts)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          } else {
            gains.push(`Stamina +${points}pts (${staminaResult.skill.points}/100)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          }
          const pacePoints = Math.round(points * 0.5)
          if (pacePoints > 0) {
            if (paceResult.leveledUp) {
              gains.push(`Pace: Level ${paceResult.skill.level}! (+${pacePoints}pts)${diminishFactor < 1 ? ' (diminished)' : ''}`)
            } else {
              gains.push(`Pace +${pacePoints}pts (${paceResult.skill.points}/100)${diminishFactor < 1 ? ' (diminished)' : ''}`)
            }
          }
          gains.push('Fun -12')
          break;
        }
        
        // STADIUM ACTIVITIES
        case 'tactics': {
          const basePoints = Math.round(8 * intensityMultiplier) // 4/8/12 points
          const points = Math.round(basePoints * diminishFactor)
          const visionResult = addSkillPoints(p.core.vision, points)
          const posResult = addSkillPoints(p.sec.positioning, Math.round(points * 0.6))
          p.core.vision = visionResult.skill
          p.sec.positioning = posResult.skill
          p.hidden.coachTrust = Math.min(100, p.hidden.coachTrust + 2)
          p.hidden.fun = Math.max(0, p.hidden.fun - 5) // Slightly boring
          if (visionResult.leveledUp) {
            gains.push(`Vision: Level ${visionResult.skill.level}! (+${points}pts)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          } else {
            gains.push(`Vision +${points}pts (${visionResult.skill.points}/100)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          }
          const posPoints = Math.round(points * 0.6)
          if (posPoints > 0) {
            if (posResult.leveledUp) {
              gains.push(`Positioning: Level ${posResult.skill.level}! (+${posPoints}pts)${diminishFactor < 1 ? ' (diminished)' : ''}`)
            } else {
              gains.push(`Positioning +${posPoints}pts (${posResult.skill.points}/100)${diminishFactor < 1 ? ' (diminished)' : ''}`)
            }
          }
          gains.push('Coach Trust +2', 'Fun -5')
          break;
        }
        case 'scrimmage': {
          const basePoints = Math.round(6 * intensityMultiplier) // 3/6/9 points
          const points = Math.round(basePoints * diminishFactor)
          // Scrimmage improves multiple skills slightly
          const paceResult = addSkillPoints(p.core.pace, Math.round(points * 0.4))
          const techResult = addSkillPoints(p.core.technique, Math.round(points * 0.4))
          const shootResult = addSkillPoints(p.sec.shooting, Math.round(points * 0.4))
          const passResult = addSkillPoints(p.sec.passing, Math.round(points * 0.4))
          p.core.pace = paceResult.skill
          p.core.technique = techResult.skill
          p.sec.shooting = shootResult.skill
          p.sec.passing = passResult.skill
          p.hidden.fun = Math.min(100, p.hidden.fun + 20) // Very fun!
          p.hidden.confidence = Math.min(100, p.hidden.confidence + 1)
          
          const subPoints = Math.round(points * 0.4)
          if (subPoints > 0) {
            const skillGains = []
            if (paceResult.leveledUp) skillGains.push(`Pace: Level ${paceResult.skill.level}!`)
            else if (subPoints > 0) skillGains.push(`Pace +${subPoints}pts`)
            if (techResult.leveledUp) skillGains.push(`Technique: Level ${techResult.skill.level}!`)
            else if (subPoints > 0) skillGains.push(`Technique +${subPoints}pts`)
            if (shootResult.leveledUp) skillGains.push(`Shooting: Level ${shootResult.skill.level}!`)
            else if (subPoints > 0) skillGains.push(`Shooting +${subPoints}pts`)
            if (passResult.leveledUp) skillGains.push(`Passing: Level ${passResult.skill.level}!`)
            else if (subPoints > 0) skillGains.push(`Passing +${subPoints}pts`)
            gains.push(...skillGains)
          }
          gains.push('Fun +20', 'Confidence +1')
          break;
        }
        case 'coaching': {
          const basePoints = Math.round(7 * intensityMultiplier) // 4/7/11 points
          const points = Math.round(basePoints * diminishFactor)
          const visionResult = addSkillPoints(p.core.vision, points)
          const defenseResult = addSkillPoints(p.core.defense, Math.round(points * 0.5))
          p.core.vision = visionResult.skill
          p.core.defense = defenseResult.skill
          p.hidden.coachTrust = Math.min(100, p.hidden.coachTrust + 3)
          p.hidden.discipline = Math.min(100, p.hidden.discipline + 2)
          p.hidden.fun = Math.min(100, p.hidden.fun + 8) // Moderately fun
          if (visionResult.leveledUp) {
            gains.push(`Vision: Level ${visionResult.skill.level}! (+${points}pts)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          } else {
            gains.push(`Vision +${points}pts (${visionResult.skill.points}/100)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          }
          const defPoints = Math.round(points * 0.5)
          if (defPoints > 0) {
            if (defenseResult.leveledUp) {
              gains.push(`Defense: Level ${defenseResult.skill.level}! (+${defPoints}pts)${diminishFactor < 1 ? ' (diminished)' : ''}`)
            } else {
              gains.push(`Defense +${defPoints}pts (${defenseResult.skill.points}/100)${diminishFactor < 1 ? ' (diminished)' : ''}`)
            }
          }
          gains.push('Coach Trust +3', 'Discipline +2', 'Fun +8')
          break;
        }
        case 'position': {
          const basePoints = Math.round(9 * intensityMultiplier) // 5/9/14 points
          const points = Math.round(basePoints * diminishFactor)
          const posResult = addSkillPoints(p.sec.positioning, points)
          const markResult = addSkillPoints(p.sec.marking, Math.round(points * 0.6))
          p.sec.positioning = posResult.skill
          p.sec.marking = markResult.skill
          p.hidden.coachTrust = Math.min(100, p.hidden.coachTrust + 1)
          p.hidden.fun = Math.max(0, p.hidden.fun - 3) // Slightly boring
          if (posResult.leveledUp) {
            gains.push(`Positioning: Level ${posResult.skill.level}! (+${points}pts)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          } else {
            gains.push(`Positioning +${points}pts (${posResult.skill.points}/100)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          }
          const markPoints = Math.round(points * 0.6)
          if (markPoints > 0) {
            if (markResult.leveledUp) {
              gains.push(`Marking: Level ${markResult.skill.level}! (+${markPoints}pts)${diminishFactor < 1 ? ' (diminished)' : ''}`)
            } else {
              gains.push(`Marking +${markPoints}pts (${markResult.skill.points}/100)${diminishFactor < 1 ? ' (diminished)' : ''}`)
            }
          }
          gains.push('Coach Trust +1', 'Fun -3')
          break;
        }
        case 'chemistry': {
          const basePoints = Math.round(12 * intensityMultiplier) // 6/12/18 points
          const points = Math.round(basePoints * diminishFactor)
          const chemResult = addSkillPoints(p.hidden.chemistry, points)
          const passResult = addSkillPoints(p.sec.passing, Math.round(points * 0.5))
          p.hidden.chemistry = chemResult.skill
          p.sec.passing = passResult.skill
          p.hidden.coachTrust = Math.min(100, p.hidden.coachTrust + 2)
          p.hidden.confidence = Math.min(100, p.hidden.confidence + 1)
          p.hidden.fun = Math.min(100, p.hidden.fun + 12) // Fun with teammates
          if (chemResult.leveledUp) {
            gains.push(`Chemistry: Level ${chemResult.skill.level}! (+${points}pts)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          } else {
            gains.push(`Chemistry +${points}pts (${chemResult.skill.points}/100)${diminishFactor < 1 ? ' (diminished)' : ''}`)
          }
          const passPoints = Math.round(points * 0.5)
          if (passPoints > 0) {
            if (passResult.leveledUp) {
              gains.push(`Passing: Level ${passResult.skill.level}! (+${passPoints}pts)${diminishFactor < 1 ? ' (diminished)' : ''}`)
            } else {
              gains.push(`Passing +${passPoints}pts (${passResult.skill.points}/100)${diminishFactor < 1 ? ' (diminished)' : ''}`)
            }
          }
          gains.push('Coach Trust +2', 'Confidence +1', 'Fun +12')
          break;
        }
      }
      
      // Apply all resource changes at the end
      ;(p as any).hunger = Math.max(0, Math.min(100, (p as any).hunger - hungerCost))
      p.energy = Math.max(0, Math.min(100, p.energy - energyDrain))
      
      // Store tick info for UI display and timeline
      const elapsed = st.trainingElapsedMinutes + 60  // 1 hour per tick
      const tickInfo = { hungerCost, energyDrain, gains, losses }
      const allEffects = [...losses, ...gains]
      if (allEffects.length > 0) {
        get().addTimelineEvent('training', `Training ${id} (${intensity}) - 1 hour`, allEffects)
      }
      
      // Increment hours for this training type AFTER calculating gains
      const newTrainingHours = { ...st.trainingHoursToday }
      newTrainingHours[id] = newTrainingHours[id] + 1
      
      set({ player: p, trainingElapsedMinutes: elapsed, lastTrainingTick: tickInfo, trainingHoursToday: newTrainingHours })
      get().advanceTime(60)  // Advance 1 hour per tick
      
      // Auto-stop if depleted after tick
      const np = get().player
      if ((np as any).hunger <= 0 || np.energy <= 0){ set({ isTraining:false, activeTraining:null, lastTrainingTick:null }); return }
      setTimeout(tick, 3000) // 3 seconds per tick (1 hour game time)
    }
    setTimeout(tick, 3000) // 3 seconds per tick (1 hour game time)
  },
  stopTrainingLoop: ()=>{ set({ isTraining:false, activeTraining:null, lastTrainingTick:null }) },
  isSleeping: false,
  startSleep: ()=>{
    const s = get()
    if (s.isSleeping || s.isTraining) return
    if (s.location !== 'HOME') return
    if ((s.player as any).hunger < 10) { alert('You are too hungry to sleep. Eat something first.'); return }
    set({ isSleeping: true })
    const tick = () => {
      const st = get()
      if (!st.isSleeping) return
      const p = { ...st.player, core: { ...st.player.core }, hidden: { ...st.player.hidden }, sec: { ...st.player.sec } }
      // Per 10-minute sleep tick
      p.energy = Math.min(100, p.energy + 5)
      ;(p as any).hunger = Math.max(0, (p as any).hunger - 2)
      set({ player: p })
      get().advanceTime(10)
      if (p.energy >= 100){ set({ isSleeping:false }); return }
      setTimeout(tick, 300)
    }
    setTimeout(tick, 300)
  },
  stopSleep: ()=> set({ isSleeping:false }),
  travelTo: (loc)=>{
    const s = get()
    if (s.location === loc) return
    // approximate travel times in minutes between locations
    const key = [s.location, loc].join('>')
    const travelMap: Record<string, number> = {
      'HOME>STADIUM': 75,
      'STADIUM>HOME': 75,
      'HOME>SHOP': 60,
      'SHOP>HOME': 60,
      'STADIUM>SHOP': 70,
      'SHOP>STADIUM': 70,
    }
    const mins = travelMap[key] ?? 15
    set({ location: loc })
    // Apply travel resource drain proportional to time: every 10min hunger -1, energy -1
    const ticks = Math.ceil(mins / 10)
    for (let i=0;i<ticks;i++){
      const p = { ...get().player, core: { ...get().player.core }, hidden: { ...get().player.hidden }, sec: { ...get().player.sec } }
      ;(p as any).hunger = Math.max(0, (p as any).hunger - 1)
      p.energy = Math.max(0, p.energy - 1)
      set({ player: p })
      get().advanceTime(10)
    }
    // Travel complete
  },
  buyMeal: ()=>{
    const s = get()
    if (s.location !== 'SHOP') return
    if (s.money < 15) return
    const pantry = { ...s.homePantry, meals: s.homePantry.meals + 1 }
    set({ homePantry: pantry, money: s.money - 15 })
    get().addTimelineEvent('shop', 'Bought meal', [`Money -$15`, `Meals +1`])
  },
  buyDrink: ()=>{
    const s = get()
    if (s.location !== 'SHOP') return
    if (s.money < 8) return
    const pantry = { ...s.homePantry, drinks: s.homePantry.drinks + 1 }
    set({ homePantry: pantry, money: s.money - 8 })
    get().addTimelineEvent('shop', 'Bought drink', [`Money -$8`, `Drinks +1`])
  },
  buyBoots: ()=>{
    const s = get()
    if (s.location !== 'SHOP') return
    if (s.money < 100) return
    const p = { ...s.player, core: { ...s.player.core }, hidden: { ...s.player.hidden }, sec: { ...s.player.sec } }
    // Give skill points for buying boots
    const paceResult = addSkillPoints(p.core.pace, 25)
    const techResult = addSkillPoints(p.core.technique, 25)
    p.core.pace = paceResult.skill
    p.core.technique = techResult.skill
    set({ player: p, money: s.money - 100 })
    get().addTimelineEvent('shop', 'Bought boots', [`Money -$100`, `Pace +25pts`, `Technique +25pts`])
  },
  // Match engine removed
  train: (id)=>{
    const p = { ...get().player, core: { ...get().player.core }, hidden: { ...get().player.hidden }, sec: { ...get().player.sec } }
    const st = get()
    if ((p as any).hunger <= 0) return
    let intensity = st.trainingIntensity
    if (intensity === 'intense' && p.hidden.coachTrust < 40) intensity = 'normal'
    const counts = { ...st.trainingCounts }
    const diminished = (counts[id] ?? 0) >= 2
    applyTraining(p, id, intensity, diminished)
    counts[id] = (counts[id] ?? 0) + 1
    // Coach trust progression from training choices
    if (id === 'chemistry') p.hidden.coachTrust = Math.min(100, p.hidden.coachTrust + 2)
    if (id === 'tactics') p.hidden.coachTrust = Math.min(100, p.hidden.coachTrust + 1)
    set({ player: p, trainingCounts: counts })
  },
  // Helper to preview exact numeric effects for UI
  previewTraining: (id: TrainingId) => {
    const st = get()
    const p = st.player
    let intensity = st.trainingIntensity
    if (intensity === 'intense' && p.hidden.coachTrust < 40) intensity = 'normal'
    const diminished = (st.trainingCounts[id] ?? 0) >= 2
    return projectTraining(p, id, intensity, diminished)
  },
  nextEvent: ()=>{ useUI.getState().setScreen('EVENT') }
  ,
  nextDay: ()=>{
    const s = get();
    const prevDay = s.day;
    let newDay = prevDay + 1;
    let newWeek = s.week;
    if (newDay > 7) { newWeek = s.week + 1; newDay = 1; }

    const p = { ...s.player, core: { ...s.player.core }, hidden: { ...s.player.hidden }, sec: { ...s.player.sec } };
    // Sleep recovers energy (restedness) and increases hunger back
    p.energy = Math.min(100, p.energy + 15);
    ;(p as any).hunger = Math.min(100, (p as any).hunger + 10);

    // Stats decay for untrained skills (lose points, potentially levels)
    const counts = s.trainingCounts;
    const hours = s.trainingHoursToday;
    // Check if no cardio training was done (jogging or conditioning)
    if ((hours.jogging || 0) === 0 && (hours.conditioning || 0) === 0) {
      const newPoints = Math.max(0, p.core.pace.points - 10);
      if (newPoints < p.core.pace.points) {
        if (newPoints === 0 && p.core.pace.level > 1) {
          p.core.pace = { level: p.core.pace.level - 1, points: 90 };
        } else {
          p.core.pace = { ...p.core.pace, points: newPoints };
        }
      }
    }
    // Check if no strength training was done (pushups or weights)
    if ((hours.pushups || 0) === 0 && (hours.weights || 0) === 0) {
      const newPoints = Math.max(0, p.core.strength.points - 10);
      if (newPoints < p.core.strength.points) {
        if (newPoints === 0 && p.core.strength.level > 1) {
          p.core.strength = { level: p.core.strength.level - 1, points: 90 };
        } else {
          p.core.strength = { ...p.core.strength, points: newPoints };
        }
      }
    }
    // Check if no shooting training was done
    if ((hours.shooting || 0) === 0) {
      // Shooting decay
      const newShootPoints = Math.max(0, p.sec.shooting.points - 10);
      if (newShootPoints < p.sec.shooting.points) {
        if (newShootPoints === 0 && p.sec.shooting.level > 1) {
          p.sec.shooting = { level: p.sec.shooting.level - 1, points: 90 };
        } else {
          p.sec.shooting = { ...p.sec.shooting, points: newShootPoints };
        }
      }
    }
    // Check if no technique training was done (juggling)
    if ((hours.juggling || 0) === 0) {
      const newTechPoints = Math.max(0, p.core.technique.points - 5);
      if (newTechPoints < p.core.technique.points) {
        if (newTechPoints === 0 && p.core.technique.level > 1) {
          p.core.technique = { level: p.core.technique.level - 1, points: 95 };
        } else {
          p.core.technique = { ...p.core.technique, points: newTechPoints };
        }
      }
    }
    // Check if no tactical training was done (tactics, position, or watching footage)
    if ((hours.tactics || 0) === 0 && (hours.position || 0) === 0 && (hours.footage || 0) === 0) {
      // Vision decay
      const newVisionPoints = Math.max(0, p.core.vision.points - 10);
      if (newVisionPoints < p.core.vision.points) {
        if (newVisionPoints === 0 && p.core.vision.level > 1) {
          p.core.vision = { level: p.core.vision.level - 1, points: 90 };
        } else {
          p.core.vision = { ...p.core.vision, points: newVisionPoints };
        }
      }
      // Positioning decay
      const newPosPoints = Math.max(0, p.sec.positioning.points - 5);
      if (newPosPoints < p.sec.positioning.points) {
        if (newPosPoints === 0 && p.sec.positioning.level > 1) {
          p.sec.positioning = { level: p.sec.positioning.level - 1, points: 95 };
        } else {
          p.sec.positioning = { ...p.sec.positioning, points: newPosPoints };
        }
      }
    }
    // Check if no team chemistry training was done (chemistry or friends)
    if ((hours.chemistry || 0) === 0 && (hours.friends || 0) === 0) {
      // Chemistry decay
      const newChemPoints = Math.max(0, p.hidden.chemistry.points - 15);
      if (newChemPoints < p.hidden.chemistry.points) {
        if (newChemPoints === 0 && p.hidden.chemistry.level > 1) {
          p.hidden.chemistry = { level: p.hidden.chemistry.level - 1, points: 85 };
        } else {
          p.hidden.chemistry = { ...p.hidden.chemistry, points: newChemPoints };
        }
      }
      // Passing decay
      const newPassPoints = Math.max(0, p.sec.passing.points - 8);
      if (newPassPoints < p.sec.passing.points) {
        if (newPassPoints === 0 && p.sec.passing.level > 1) {
          p.sec.passing = { level: p.sec.passing.level - 1, points: 92 };
        } else {
          p.sec.passing = { ...p.sec.passing, points: newPassPoints };
        }
      }
    }

    // Injury chance when energy very low (worn down)
    if (p.energy < 20) {
      const risk = 0.1; // small chance
      if (Math.random() < risk) {
        if (!p.traits.includes('knock')) p.traits = [...p.traits, 'knock'];
        p.energy = Math.max(0, p.energy - 20);
        p.hidden.morale = Math.max(0, p.hidden.morale - 5);
        p.hidden.injuryRisk = Math.min(100, p.hidden.injuryRisk + 3);
      }
    }

    // Reset weekly training diminishing returns every Monday (Day 1) - keeping old system for compatibility
    const resetCounts = newDay === 1 ? { sprint:0, gym:0, shooting:0, tactics:0, team:0 } : get().trainingCounts
    // Reset daily training hours for all new activities
    const resetHours = { 
      // Home
      jogging:0, juggling:0, pushups:0, footage:0, friends:0,
      // Gym  
      weights:0, conditioning:0,
      // School
      shooting:0, tactics:0, coaching:0, position:0,
      // Stadium
      scrimmage:0, chemistry:0
    }
    set({ player: p, day: newDay, week: newWeek, trainingCounts: resetCounts, trainingHoursToday: resetHours });

    // No auto-match on day 6
  },
  restDay: ()=>{
    const s = get()
    const p = { ...s.player, core: { ...s.player.core }, hidden: { ...s.player.hidden }, sec: { ...s.player.sec } }
    if (s.money < 20) return
    p.energy = Math.min(100, p.energy + 10)
    ;(p as any).hunger = Math.min(100, (p as any).hunger + 5)
    set({ player: p, money: s.money - 20 })
  },
  physio: ()=>{
    const s = get()
    const p = { ...s.player, core: { ...s.player.core }, hidden: { ...s.player.hidden }, sec: { ...s.player.sec } }
    if (s.money < 50) return
    p.energy = Math.min(100, p.energy + 5)
    if (p.traits.includes('knock')) p.traits = p.traits.filter(t=>t!=='knock')
    set({ player: p, money: s.money - 50 })
  },
  eatMeal: ()=>{
    const s = get()
    if (s.isTraining) return
    if (s.location !== 'HOME') return
    if (s.homePantry.meals <= 0) return
    const p = { ...s.player, core: { ...s.player.core }, hidden: { ...s.player.hidden }, sec: { ...s.player.sec } }
    // Meals restore at least half of max hunger (50 points minimum)
    const current = (p as any).hunger
    ;(p as any).hunger = Math.min(100, current + 50) // Always restore 50 hunger points
    p.energy = Math.min(100, p.energy + 5)
    set({ player: p, homePantry: { ...s.homePantry, meals: s.homePantry.meals - 1 } })
    // Cooking and eating takes 1 hour
    get().advanceTime(60)
    get().addTimelineEvent('meal', 'Ate meal at home', [`Hunger +50`, `Energy +5`, `Time -1h`])
  },
  addTimelineEvent: (type: string, message: string, effects: string[]) => {
    const now = new Date()
    const timestamp = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`
    const event = { timestamp, type, message, effects }
    const timeline = [...get().timeline, event]
    // Keep last 50 events for development
    const trimmed = timeline.slice(-50)
    set({ timeline: trimmed })
  },
  drink: ()=>{
    const s = get()
    if (s.isTraining) return
    if (s.location !== 'HOME') return
    if (s.homePantry.drinks <= 0) return
    const p = { ...s.player, core: { ...s.player.core }, hidden: { ...s.player.hidden }, sec: { ...s.player.sec } }
    ;(p as any).hunger = Math.min(100, (p as any).hunger + 10)
    set({ player: p, homePantry: { ...s.homePantry, drinks: s.homePantry.drinks - 1 } })
    get().addTimelineEvent('drink', 'Drank at home', [`Hunger +10`])
  }
}))
