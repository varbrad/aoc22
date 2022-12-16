import { initial, values } from 'lodash'
import { max } from '../utils/array'
import { split } from '../utils/string'

type Valve = { name: string; rate: number; tunnels: string[] }

const parse = (input: string): Record<string, Valve> =>
  split(input)
    .map((i) => {
      const result = /Valve (\w+)(?:.*)rate=(\d+)(?:.*)valves? (.*)/
        .exec(i)!
        .slice(1)
      return {
        name: result[0],
        rate: Number(result[1]),
        tunnels: result[2].split(', '),
      }
    })
    .reduce((prev, v) => ({ ...prev, [v.name]: v }), {})

const pathfind = (
  valves: Record<string, Valve>,
  start: string,
  end: string
) => {
  const openList = [{ name: start, g: 0 }]
  const closedList: string[] = []
  while (openList.length > 0) {
    const current = openList.shift()!
    if (current.name === end) {
      return current.g
    }
    closedList.push(current.name)
    const neighbours = valves[current.name].tunnels
    for (const neighbour of neighbours) {
      if (closedList.includes(neighbour)) continue
      const isOnOpenList = openList.find((n) => n.name === neighbour)
      if (isOnOpenList) {
        isOnOpenList.g = Math.min(isOnOpenList.g, current.g + 1)
      } else {
        openList.push({ name: neighbour, g: current.g + 1 })
      }
    }
  }
  return -1
}

const producePathfinderMap = (valves: Record<string, Valve>) => {
  const allValves = Object.values(valves).map((v) => v.name)
  const map: Map<string, number> = new Map()
  for (let i = 0; i < allValves.length - 1; i++) {
    const v1 = valves[allValves[i]]
    for (let j = i + 1; j < allValves.length; j++) {
      const v2 = valves[allValves[j]]
      const distance = pathfind(valves, v1.name, v2.name)
      map.set([v1.name, v2.name].sort().join('-'), distance)
    }
  }
  return map
}

type State = {
  location: string
  visited: string[]
  score: number
  timeLeft: number
  scoreLeft: number
  moves: string[]
}

const evaluateMoves = (
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

const maxScoreLeft = (
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

export const part1 = (input: string) => {
  const valves = parse(input)
  const scoringToVisit = Object.values(valves)
    .filter((v) => v.rate > 0)
    .sort((a, b) => b.rate - a.rate)
  const pathfinderMap = producePathfinderMap(valves)

  let states: State[] = [
    {
      location: 'AA',
      visited: [],
      score: 0,
      timeLeft: 30,
      scoreLeft: maxScoreLeft(scoringToVisit, 30, []),
      moves: ['AA'],
    },
  ]

  let maxScore = 0
  let loops = 0
  while (states.length > 0) {
    loops++
    if (loops % 1000 === 0) console.log(loops, states.length, maxScore)
    const current = states.shift()!
    const nextMoves = evaluateMoves(current, scoringToVisit, pathfinderMap)
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
