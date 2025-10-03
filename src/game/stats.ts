
export function statContest(attack:number, defend:number, fatiguePct:number, morale:number, difficulty:number){
  const fatMul = 1 - 0.5 * (fatiguePct/100)
  const moraleMul = 1 + 0.25 * ((morale-50)/50)
  const atkEff = attack * fatMul * moraleMul
  const defEff = defend * (1 + 0.1*difficulty)
  const base = 50 + 25 * Math.tanh((atkEff - defEff)/20)
  const p = Math.max(5, Math.min(95, base))
  return p
}
