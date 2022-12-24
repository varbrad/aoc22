import { array } from '../utils/array'
import { lcm } from '../utils/math'
import { split } from '../utils/string'

const UP = [0, -1]
const DOWN = [0, 1]
const LEFT = [-1, 0]
const RIGHT = [1, 0]
const STILL = [0, 0]
const Directions = {
  '^': UP,
  '>': RIGHT,
  v: DOWN,
  '<': LEFT,
}
const MOVES = [UP, RIGHT, DOWN, LEFT, STILL]

const parse = (input: string) => {
  const initial = split(input).map((line) =>
    line.split('').map((c) => (c === '.' ? [] : [c]))
  )
  const [w, h] = [initial[0].length - 2, initial.length - 2]
  const windSimCyclesNeeded = lcm(w, h)
  const states = array(windSimCyclesNeeded - 1).reduce((maps, _, ix) => {
    const m = maps.get(ix)!
    const next = m.map((row, y) =>
      row.map((cell, x) => (!y || y === h + 1 || !x || x === w + 1 ? cell : []))
    )

    m.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (!y || y === h + 1 || !x || x === w + 1) return
        cell.forEach((item) => {
          const [dx, dy] = Directions[item as keyof typeof Directions]
          const _y = 1 + ((y + dy + h - 1) % h)
          const _x = 1 + ((x + dx + w - 1) % w)
          next[_y][_x].push(item)
        })
      })
    })
    return maps.set(ix + 1, next)
  }, new Map([[0, initial]]))

  return { initial, states }
}

type Grid = string[][][]
type Vec2 = [number, number]

const bfs = (
  states: Map<number, Grid>,
  start: Vec2,
  end: Vec2,
  startTime = 0
): number => {
  const [endx, endy] = end
  let openList = [[...start, startTime]]
  const v = new Set()
  while (openList.length > 0) {
    const [px, py, time] = openList.shift()!
    if (px === endx && py === endy) return time
    const blizzard = states.get((time + 1) % states.size)!
    const moves = MOVES.map(([dx, dy]) => [dx + px, dy + py])
    const validUniqueMoves = moves
      .filter(([x, y]) => blizzard[y]?.[x] && blizzard[y][x].length === 0)
      .map((pos) => [...pos, (time + 1) % states.size])
      .filter((k) => !v.has(String(k)) && v.add(String(k))) // dedupe

    const nextStates = validUniqueMoves.map(([x, y]) => [
      x,
      y,
      time + 1,
      Math.abs(endx - x) + Math.abs(endy - y) + time + 1,
    ])
    openList.push(...nextStates)
    openList.sort((a, b) => a[3] - b[3])
  }
  return -1
}

const prepare = (input: string) => {
  const { initial, states } = parse(input)
  const start: Vec2 = [initial[0]!.findIndex((c) => c.length === 0), 0]
  const end: Vec2 = [
    initial[initial.length - 1].findIndex((c) => c.length === 0),
    initial.length - 1,
  ]

  return { states, start, end }
}

export const part1 = (input: string) => {
  const { states, start, end } = prepare(input)
  return bfs(states, start, end) ?? -1
}

export const part2 = (input: string) => {
  const { states, start, end } = prepare(input)
  const toTheEnd = bfs(states, start, end, 0)
  const returnToGetSnacks = bfs(states, end, start, toTheEnd)
  return bfs(states, start, end, returnToGetSnacks)
}
