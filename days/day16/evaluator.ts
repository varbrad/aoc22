import { cloneDeep } from 'lodash'
import { Valve } from './parse'

export type State = {
  location: string
  visited: string[]
  score: number
  timeLeft: number
  scoreLeft: number
  moves: string[]
}

type WorkerState = { location: string; timeLeft: number; moves: string[] }
export type State2 = Omit<State, 'location' | 'timeLeft' | 'moves'> & {
  workers: [WorkerState, WorkerState]
}

export const evaluateMoves = (
  current: State,
  scoringValves: Valve[],
  pathfinderMap: Map<string, number>
) => {
  const locationsToVisit = scoringValves.filter(
    (v) => !current.visited.includes(v.name)
  )
  if (locationsToVisit.length === 0) return 'finished'
  const moves: State[] = locationsToVisit
    .map<State | null>((v) => {
      const distance = pathfinderMap.get(
        [current.location, v.name].sort().join('-')
      )!
      const timeLeft = current.timeLeft - distance - 1
      if (timeLeft < 0) return null
      const visited = [...current.visited, v.name]
      return {
        location: v.name,
        score: current.score + v.rate * timeLeft,
        timeLeft,
        visited,
        scoreLeft: maxScoreLeft(scoringValves, timeLeft, visited),
        moves: [...current.moves, v.name],
      }
    }, [])
    .filter((v): v is State => v !== null)

  return moves
}

export const maxScoreLeft = (
  scoringToVisit: Valve[],
  timeLeft: number,
  visited: string[]
) => {
  const valvesLeft = scoringToVisit
    .filter((v) => !visited.includes(v.name))
    .map((v) => v.rate)
  return valvesLeft.reduce((prev, curr, index) => {
    const tl = timeLeft - 1 - index
    if (tl < 0) return prev
    return prev + curr * tl
  }, 0)
}

export const evaluateMoves2 = (
  current: State2,
  scoringValves: Valve[],
  pathfinderMap: Map<string, number>
) => {
  const locationsToVisit = scoringValves.filter(
    (v) => !current.visited.includes(v.name)
  )
  if (locationsToVisit.length === 0) return 'finished'

  const moves: State2[] = []

  for (const a of locationsToVisit) {
    for (const b of locationsToVisit) {
      if (a.name === b.name) continue
      const [workerA, workerB] = current.workers
      const distanceA = pathfinderMap.get(
        [workerA.location, a.name].sort().join('-')
      )!
      const distanceB = pathfinderMap.get(
        [workerB.location, b.name].sort().join('-')
      )!
      const tlA = workerA.timeLeft - distanceA - 1
      const tlB = workerB.timeLeft - distanceB - 1
      if (tlA < 0 && tlB < 0) continue
      const newState: State2 = cloneDeep(current)
      if (tlA >= 0) {
        newState.visited = [...newState.visited, a.name]
        newState.workers[0] = {
          location: a.name,
          timeLeft: tlA,
          moves: [...workerA.moves, a.name],
        }
        newState.score += a.rate * tlA
      }
      if (tlB >= 0) {
        newState.visited = [...newState.visited, b.name]
        newState.workers[1] = {
          location: b.name,
          timeLeft: tlB,
          moves: [...workerB.moves, b.name],
        }
        newState.score += b.rate * tlB
      }
      newState.scoreLeft = maxScoreLeft(
        scoringValves,
        Math.max(tlA, tlB),
        newState.visited
      )
      moves.push(newState)
    }
  }

  return moves
}
