
import { statContest } from './stats'
import type { Player, MatchHighlight, Ability } from './types'

export function resolveDecision(
  rng: { next:()=>number }, player: Player, oppDefStat: number, ability: Ability, contextDifficulty: number
){
  const primaryAvg = ability.primaryCheck.map(k => (player.core as any)[k]).reduce((a:number,b:number)=>a+b,0)/ability.primaryCheck.length
  const energy = player.energy
  const morale = player.hidden.morale
  const base = ability.baseSuccess
  // Convert restedness (energy 0..100) to fatigue percentage for contest (higher fatigue = worse)
  const fatiguePct = Math.max(0, Math.min(100, 100 - energy))
  let duelP = statContest(primaryAvg, oppDefStat, fatiguePct, morale, contextDifficulty)
  // Stronger penalties when energy is low
  if (energy <= 40 && energy > 20) duelP -= 5
  else if (energy <= 20) duelP -= 10
  const p = Math.min(95, Math.max(5, base + (duelP-50)))
  const success = rng.next() < p/100
  // Spend hunger on abilities and drain energy slightly
  ;(player as any).hunger = Math.max(0, (player as any).hunger - ability.costEnergy)
  player.energy = Math.max(0, player.energy - Math.ceil(ability.costEnergy/2))
  if (ability.hiddenMods){
    for (const k of Object.keys(ability.hiddenMods) as (keyof typeof ability.hiddenMods)[]){
      // @ts-ignore
      player.hidden[k] = Math.max(0, Math.min(100, player.hidden[k] + (ability.hiddenMods![k] ?? 0)))
    }
  }
  return { success, p }
}

export function generateHighlight(minute:number): MatchHighlight {
  const variants = [
    { narrative: "You sprint down the wing. The defender closes in! What will you do?",
      decisions: [
        { id: 'dribble', label: 'Dribble Inside', ability: 'quick_dribble' },
        { id: 'cross',   label: 'Early Cross',    ability: 'cross_basic'   },
        { id: 'shot',    label: 'Long Shot',      ability: 'long_shot'     }
      ], ctx: { role: 'CB' as const, def: 65, diff: 1 } },
    { narrative: "Midfield break! You have space between the lines.",
      decisions: [
        { id: 'dribble', label: 'Drive Forward', ability: 'quick_dribble' },
        { id: 'cross',   label: 'Threaded Pass', ability: 'cross_basic'   },
        { id: 'shot',    label: 'Dipping Shot',  ability: 'long_shot'     }
      ], ctx: { role: 'CM' as const, def: 60, diff: 1 } },
    { narrative: "Cutback chance near the byline.",
      decisions: [
        { id: 'dribble', label: 'Beat Man on Line', ability: 'quick_dribble' },
        { id: 'cross',   label: 'Low Cutback',      ability: 'cross_basic'   },
        { id: 'shot',    label: 'Tight-angle Shot', ability: 'long_shot'     }
      ], ctx: { role: 'CB' as const, def: 68, diff: 2 } }
  ];
  const v = variants[Math.floor(Math.random()*variants.length)];
  return { id: `hl-${minute}`, minute, narrative: v.narrative, decisions: v.decisions, context: { opponentRole: v.ctx.role, difficulty: v.ctx.diff } }
}
