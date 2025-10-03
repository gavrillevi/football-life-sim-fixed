
import events from '../data/events.json';
import type { EventNode } from './types';
export function getNextEvent(): EventNode | null { return (events as EventNode[])[0] ?? null; }
export function applyEffects(player: any, choice: any) {
  const eff = choice.effects || {};
  if (eff.core) for (const k in eff.core) player.core[k] += eff.core[k];
  if (eff.sec)  for (const k in eff.sec)  player.sec[k]  += eff.sec[k];
  if (eff.hidden) for (const k in eff.hidden) player.hidden[k] = Math.max(0, Math.min(100, player.hidden[k] + eff.hidden[k]));
}
