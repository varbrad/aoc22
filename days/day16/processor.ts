import { evaluateMoves, State } from './evaluator'
import { Valve } from './parse'

export const solve = (
  initialState: State,
  scoringNodes: Valve[],
  pathfinderMap: Map<string, number>
) => {
  let states = [initialState]
  let maxScore = 0
  while (states.length > 0) {
    const current = states.shift()!
    const nextMoves = evaluateMoves(current, scoringNodes, pathfinderMap)
    maxScore = Math.max(maxScore, current.score)
    if (nextMoves === 'finished') {
      states = states.filter((s) => s.scoreLeft + s.score > maxScore)
    } else if (nextMoves.length > 0) {
      states.push(...nextMoves)
      states.sort((a, b) => b.score - a.score)
    }
  }
  return maxScore
}
