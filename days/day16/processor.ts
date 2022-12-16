import { evaluateMoves, evaluateMoves2, State, State2 } from './evaluator'
import { Valve } from './parse'

export const solve = (
  initialState: State,
  scoringNodes: Valve[],
  pathfinderMap: Map<string, number>
) => {
  let states = [initialState]
  let best = { path: '', score: 0 }
  while (states.length > 0) {
    const current = states.shift()!
    const nextMoves = evaluateMoves(current, scoringNodes, pathfinderMap)
    if (current.score > best.score) {
      best.score = current.score
      best.path = current.moves.join('-')
    }
    if (nextMoves === 'finished') {
      states = states.filter((s) => s.scoreLeft + s.score > best.score)
    } else if (nextMoves.length > 0) {
      states.push(...nextMoves)
      states.sort((a, b) => b.score - a.score)
    }
  }
  return best
}

export const solve2 = (
  initialState: State2,
  scoringNodes: Valve[],
  pathfinderMap: Map<string, number>
) => {
  let states = [initialState]
  let best = { paths: ['', ''], score: 0 }
  while (states.length > 0) {
    const current = states.shift()!
    const nextMoves = evaluateMoves2(current, scoringNodes, pathfinderMap)
    if (current.score > best.score) {
      best.score = current.score
      best.paths[0] = current.workers[0].moves.join('-')
      best.paths[1] = current.workers[1].moves.join('-')
    }
    if (nextMoves === 'finished') {
      states = states.filter((s) => s.scoreLeft + s.score > best.score)
    } else if (nextMoves.length > 0) {
      states.push(...nextMoves)
      states = states
        .sort((a, b) => b.score - a.score)
        .filter((s) => s.score + s.scoreLeft > best.score)
    }
  }
  return best
}
