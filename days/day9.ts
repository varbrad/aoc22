import { array } from '../utils/array'
import { split } from '../utils/string'

const parse = (input: string, length = 2) => ({
  state: array(length).map(() => [0, 0] as [number, number]),
  moves: split(input).map((r) => {
    const s = r.split(' ')
    return { dir: s[0], n: Number(s[1]) }
  }),
})

const follow = (items: [number, number][], i: number) => {
  const [head, tail] = [items[i], items[i + 1]]
  const dx = head[0] - tail[0]
  const dy = head[1] - tail[1]
  if (Math.abs(dx) === 2) tail[0] += Math.sign(dx)
  if (Math.abs(dy) === 2) tail[1] += Math.sign(dy)
  if (Math.abs(dx) === 1 && Math.abs(dy) === 2) tail[0] = head[0]
  if (Math.abs(dy) === 1 && Math.abs(dx) === 2) tail[1] = head[1]
}

const solve = (input: string, length = 2) => {
  const { state, moves } = parse(input, length)
  const map = new Map<string, number>([['0,0', 1]])
  moves.forEach((move) => {
    const head = state[0]
    const tail = state[state.length - 1]
    for (let i = 0; i < move.n; i++) {
      head[0] += move.dir === 'L' ? -1 : move.dir === 'R' ? 1 : 0
      head[1] += move.dir === 'D' ? -1 : move.dir === 'U' ? 1 : 0
      for (let k = 0; k < state.length - 1; k++) follow(state, k)
      map.set(tail.join(','), (map.get(tail.join(',')) || 0) + 1)
    }
  })
  return map.size
}

export const part1 = (input: string) => solve(input, 2)
export const part2 = (input: string) => solve(input, 10)
