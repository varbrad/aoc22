import { minmax } from '../utils/math'
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
        }
      }
      if (x1 < bounds.x1) bounds.x1 = x1
      if (x2 > bounds.x2) bounds.x2 = x2
      if (y1 < bounds.y1) bounds.y1 = y1
      if (y2 > bounds.y2) bounds.y2 = y2
    }
  })
  return { grid, bounds, floor: bounds.y2 + 2 }
}

const print = ({ grid, bounds }: ReturnType<typeof parse>) => {
  let str = ''
  for (let y = bounds.y1; y <= bounds.y2; ++y) {
    for (let x = bounds.x1; x <= bounds.x2; ++x) {
      str += grid.get(`${x},${y}`) || '.'
    }
    str += '\n'
  }
  console.log(str)
}

const addSand = (
  opts: ReturnType<typeof parse>,
  [x, y]: [x: number, y: number]
): 'out-of-bounds' | 'continue' => {
  const { grid, bounds } = opts
  // 0. Are we below the bounds?
  if (y > bounds.y2) return 'out-of-bounds'
  // 1. Is the block below free
  if (!grid.has(`${x},${y + 1}`)) {
    return addSand(opts, [x, y + 1])
  }
  // 2. Is the block to the below left free?
  if (!grid.has(`${x - 1},${y + 1}`)) {
    return addSand(opts, [x - 1, y + 1])
  }
  // 3. Is the block to the below right free?
  if (!grid.has(`${x + 1},${y + 1}`)) {
    return addSand(opts, [x + 1, y + 1])
  }
  // 4. Ok we are stuck, lets add ourselves to the grid
  grid.set(`${x},${y}`, 'o')
  if (x < bounds.x1) bounds.x1 = x
  if (x > bounds.x2) bounds.x2 = x
  if (y < bounds.y1) bounds.y1 = y
  if (y > bounds.y2) bounds.y2 = y
  return 'continue'
}

const addSandWithFloor = (
  opts: ReturnType<typeof parse>,
  [x, y]: [x: number, y: number]
): 'continue' | 'at-source' => {
  const { grid, bounds } = opts
  // 1. Is the block below free
  if (!grid.has(`${x},${y + 1}`) && y + 1 < opts.floor) {
    return addSandWithFloor(opts, [x, y + 1])
  }
  // 2. Is the block to the below left free?
  if (!grid.has(`${x - 1},${y + 1}`) && y + 1 < opts.floor) {
    return addSandWithFloor(opts, [x - 1, y + 1])
  }
  // 3. Is the block to the below right free?
  if (!grid.has(`${x + 1},${y + 1}`) && y + 1 < opts.floor) {
    return addSandWithFloor(opts, [x + 1, y + 1])
  }
  // 4. Ok we are stuck, lets add ourselves to the grid
  grid.set(`${x},${y}`, 'o')
  if (x < bounds.x1) bounds.x1 = x
  if (x > bounds.x2) bounds.x2 = x
  if (y < bounds.y1) bounds.y1 = y
  if (y > bounds.y2) bounds.y2 = y
  return x === 500 && y === 0 ? 'at-source' : 'continue'
}

export const part1 = (input: string) => {
  const data = parse(input)
  let count = 0
  while (true) {
    const result = addSand(data, [500, 0])
    if (result === 'out-of-bounds') break
    count++
  }
  return count
}

export const part2 = (input: string) => {
  const data = parse(input)
  let count = 0
  while (true) {
    const result = addSandWithFloor(data, [500, 0])
    count++
    if (result === 'at-source') break
  }
  return count
}
