
import type { Player } from './types'
// Home training options
export type HomeTrainingId = 'jogging'|'juggling'|'pushups'|'footage'|'friends';
// Gym training options  
export type GymTrainingId = 'weights'|'conditioning';
// School training options
export type SchoolTrainingId = 'shooting'|'tactics'|'coaching'|'position';
// Stadium training options (professional level)
export type StadiumTrainingId = 'scrimmage'|'chemistry';
// All training types
export type TrainingId = HomeTrainingId | GymTrainingId | SchoolTrainingId | StadiumTrainingId;
export type TrainingIntensity = 'light'|'normal'|'intense';

function clampStat(v:number, min:number, max:number){ return Math.max(min, Math.min(max, v)) }
function applyGain(current:number, delta:number, min:number, max:number){ return clampStat(current + delta, min, max) }
function scaleGain(delta:number, diminished:boolean){ return diminished ? Math.floor(delta*0.5) : delta }

export type TrainingProjection = {
  energyCost: number; // will reduce hunger
  fatigueAdd: number; // will reduce energy
  deltas: { core?: Partial<Player['core']>; sec?: Partial<Player['sec']>; hidden?: Partial<Player['hidden']>; };
}

export function projectTraining(_p: Player, t: TrainingId, intensity: TrainingIntensity = 'normal', diminished = false): TrainingProjection{
  const energyCost = intensity === 'light' ? 6 : intensity === 'normal' ? 10 : 16
  let fatigueAdd = intensity === 'light' ? 4 : intensity === 'normal' ? 8 : 14
  const deltas: TrainingProjection['deltas'] = { core:{}, sec:{}, hidden:{} }

  switch (t){
    case 'jogging': {
      const gain = scaleGain(intensity === 'light' ? 5 : intensity === 'normal' ? 10 : 15, diminished)
      deltas.core!.pace = { level: 1, points: gain }
      deltas.hidden!.fun = 3
      break;
    }
    case 'juggling': {
      const techGain = scaleGain(intensity === 'light' ? 5 : intensity === 'normal' ? 10 : 15, diminished)
      deltas.core!.technique = { level: 1, points: techGain }
      deltas.hidden!.fun = 4
      break;
    }
    case 'pushups': {
      const gain = scaleGain(intensity === 'light' ? 5 : intensity === 'normal' ? 10 : 15, diminished)
      deltas.core!.strength = { level: 1, points: gain }
      break;
    }
    case 'footage': {
      const visGain = scaleGain(intensity === 'light' ? 5 : intensity === 'normal' ? 10 : 15, diminished)
      deltas.core!.vision = { level: 1, points: visGain }
      deltas.hidden!.coachTrust = 2
      deltas.hidden!.fun = 3
      break;
    }
    case 'friends': {
      const chemGain = scaleGain(intensity === 'light' ? 5 : intensity === 'normal' ? 10 : 15, diminished)
      deltas.hidden!.chemistry = { level: 1, points: chemGain }
      deltas.hidden!.fun = 5
      break;
    }
    case 'weights': {
      const gain = scaleGain(intensity === 'light' ? 5 : intensity === 'normal' ? 10 : 15, diminished)
      deltas.core!.strength = { level: 1, points: gain }
      break;
    }
    case 'conditioning': {
      const paceGain = scaleGain(intensity === 'light' ? 5 : intensity === 'normal' ? 10 : 15, diminished)
      deltas.core!.pace = { level: 1, points: paceGain }
      break;
    }
    case 'shooting': {
      const shotGain = scaleGain(intensity === 'light' ? 5 : intensity === 'normal' ? 10 : 15, diminished)
      deltas.sec!.shooting = { level: 1, points: shotGain }
      deltas.core!.technique = { level: 1, points: 3 }
      deltas.hidden!.confidence = intensity === 'light' ? 2 : intensity === 'normal' ? 4 : 6
      break;
    }
    case 'tactics': {
      const visGain = scaleGain(intensity === 'light' ? 5 : intensity === 'normal' ? 10 : 15, diminished)
      deltas.core!.vision = { level: 1, points: visGain }
      deltas.sec!.positioning = { level: 1, points: 3 }
      deltas.hidden!.coachTrust = intensity === 'light' ? 2 : intensity === 'normal' ? 4 : 6
      break;
    }
    case 'coaching': {
      const techGain = scaleGain(intensity === 'light' ? 5 : intensity === 'normal' ? 10 : 15, diminished)
      deltas.core!.technique = { level: 1, points: techGain }
      deltas.hidden!.coachTrust = intensity === 'light' ? 4 : intensity === 'normal' ? 8 : 12
      break;
    }
    case 'position': {
      const defGain = scaleGain(intensity === 'light' ? 5 : intensity === 'normal' ? 10 : 15, diminished)
      deltas.core!.defense = { level: 1, points: defGain }
      const posGain = intensity === 'light' ? 5 : intensity === 'normal' ? 10 : 15
      deltas.sec!.positioning = { level: 1, points: posGain }
      break;
    }
    case 'scrimmage': {
      const chemGain = scaleGain(intensity === 'light' ? 5 : intensity === 'normal' ? 10 : 15, diminished)
      deltas.hidden!.chemistry = { level: 1, points: chemGain }
      deltas.core!.vision = { level: 1, points: 3 }
      const passGain = intensity === 'light' ? 3 : intensity === 'normal' ? 6 : 9
      deltas.sec!.passing = { level: 1, points: passGain }
      break;
    }
    case 'chemistry': {
      const chemGain = scaleGain(intensity === 'light' ? 8 : intensity === 'normal' ? 15 : 20, diminished)
      deltas.hidden!.chemistry = { level: 1, points: chemGain }
      deltas.sec!.passing = { level: 1, points: 3 }
      deltas.hidden!.confidence = intensity === 'light' ? 3 : intensity === 'normal' ? 6 : 9
      break;
    }
  }
  return { energyCost, fatigueAdd, deltas }
}

export function applyTraining(p: Player, t: TrainingId, intensity: TrainingIntensity = 'normal', diminished = false){
  const proj = projectTraining(p, t, intensity, diminished)
  ;(p as any).hunger = clampStat((p as any).hunger - proj.energyCost, 0, 100)
  p.energy = clampStat(p.energy - proj.fatigueAdd, 0, 100)
  if (proj.deltas.core) for (const k in proj.deltas.core) (p.core as any)[k] = applyGain((p.core as any)[k], (proj.deltas.core as any)[k], 0, 99)
  if (proj.deltas.sec) for (const k in proj.deltas.sec) (p.sec as any)[k] = (p.sec as any)[k] + (proj.deltas.sec as any)[k]
  if (proj.deltas.hidden) for (const k in proj.deltas.hidden) (p.hidden as any)[k] = clampStat((p.hidden as any)[k] + (proj.deltas.hidden as any)[k], 0, 100)
  return proj
}
