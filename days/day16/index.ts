import { evaluateMoves, maxScoreLeft, State } from './evaluator'
import { parse, Valve } from './parse'
import { producePathfinderMap } from './pathfinder'
import { solve, solve2 } from './processor'

export const part1 = (input: string) => {
  const valves = parse(input)
  const scoringToVisit = Object.values(valves).filter((v) => v.rate > 0)
  const pathfinderMap = producePathfinderMap(valves)

  return solve(
    {
      location: 'AA',
      visited: [],
      score: 0,
      timeLeft: 30,
      scoreLeft: 0,
      moves: ['AA'],
    },
    scoringToVisit,
    pathfinderMap
  ).score
}

export const part2 = (input: string) => {
  const valves = parse(input)
  const scoringToVisit = Object.values(valves).filter((v) => v.rate > 0)
  const pathfinderMap = producePathfinderMap(valves)

  return solve2(
    {
      workers: [
        { location: 'AA', timeLeft: 26, moves: ['AA'] },
        { location: 'AA', timeLeft: 26, moves: ['AA'] },
      ],
      visited: [],
      score: 0,
      scoreLeft: 0,
    },
    scoringToVisit,
    pathfinderMap
  ).score
}
