import { Valve } from './parse'

export type State = {
  location: string
  visited: string[]
  score: number
  timeLeft: number
  scoreLeft: number
  moves: string[]
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
