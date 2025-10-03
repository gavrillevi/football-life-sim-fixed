
export type SkillLevel = { level: number; points: number; } // level starts at 1, points 0-99
export type CoreStats = { pace:SkillLevel; strength:SkillLevel; technique:SkillLevel; vision:SkillLevel; defense:SkillLevel; }
export type HiddenStats = { confidence:number; morale:number; discipline:number; chemistry:SkillLevel; reputation:number; injuryRisk:number; coachTrust:number; fans:number; sponsors:number; fun:number; }
export type Secondary = { shooting:SkillLevel; passing:SkillLevel; dribbling:SkillLevel; marking:SkillLevel; stamina:SkillLevel; positioning:SkillLevel; }
export type Role = 'RW'|'LW'|'ST'|'CM'|'DM'|'CB'|'GK';
export type Player = { id:string; name:string; age:number; role:Role; core:CoreStats; hidden:HiddenStats; sec:Secondary; hunger:number; energy:number; xp:number; traits:string[]; }
export type AbilityId = string;
export type Ability = { id: AbilityId; label: string; costEnergy: number; primaryCheck: ('pace'|'technique'|'vision'|'defense'|'strength')[]; secondaryCheck?: ('shooting'|'passing'|'dribbling'|'positioning'|'marking'|'stamina')[]; hiddenMods?: Partial<HiddenStats>; baseSuccess: number; }
export type HighlightDecision = { id:string; label:string; ability:AbilityId; }
export type MatchHighlight = { id:string; minute:number; narrative:string; decisions:HighlightDecision[]; context:{ opponentRole:Role; difficulty:number; } }
export type EventChoice = { id:string; label:string; effects?: any; goto?: string; }
export type EventNode = { id:string; title:string; text:string; choices: EventChoice[]; }
