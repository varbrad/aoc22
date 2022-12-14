import { minmax, nextBounds } from '../utils/math'
import { split } from '../utils/string'

const parse = (input: string) => {
  const grid = new Map<string, string>()
  const bounds = { x1: Infinity, x2: -Infinity, y1: Infinity, y2: -Infinity }
  split(input).forEach((line) => {
    const rect = Array.from(line.matchAll(/(\d+),(\d+)/g)).map((n) => ({
      x: +n[1],
      y: +n[2],
    }))
    for (let i = 0; i < rect.length - 1; i++) {
      const [a, b] = rect.slice(i, i + 2)
      const [x1, x2] = minmax(a.x, b.x)
      const [y1, y2] = minmax(a.y, b.y)
      for (let x = x1; x <= x2; ++x) {
        for (let y = y1; y <= y2; ++y) {
          grid.set(`${x},${y}`, '#')
          nextBounds(bounds, x, y)
        }
      }
    }
  })
  return { grid, bounds, floor: bounds.y2 + 2 }
}

const addSand = (
  opts: ReturnType<typeof parse>,
  [x, y]: [x: number, y: number],
  withFloor: boolean = false
): 'out-of-bounds' | 'continue' | 'at-source' => {
  const { grid, bounds } = opts
  if (!withFloor && y > bounds.y2) return 'out-of-bounds'
  for (const dx of [0, -1, 1]) {
    if (!grid.has(`${x + dx},${y + 1}`) && (!withFloor || y + 1 < opts.floor)) {
      return addSand(opts, [x + dx, y + 1], withFloor)
    }
  }
  grid.set(`${x},${y}`, 'o')
  nextBounds(bounds, x, y)
  return x === 500 && y === 0 ? 'at-source' : 'continue'
}

const solve = (
  input: string,
  breakAt: 'out-of-bounds' | 'at-source',
  countFrom = 0
) => {
  for (let [count, data] = [countFrom, parse(input)]; true; count++) {
    const result = addSand(data, [500, 0], breakAt === 'at-source')
    if (result === breakAt) return count
  }
}

export const part1 = (input: string) => solve(input, 'out-of-bounds', 0)
export const part2 = (input: string) => solve(input, 'at-source', 1)
