import { split } from '../utils/string'
import { minmax } from '../utils/math'

type Vec2 = { x: number; y: number }

const shapes = [
  '####',
  '.#.\n###\n.#.',
  '..#\n..#\n###',
  '#\n#\n#\n#',
  '##\n##',
].map((shape) => {
  const points = split(shape)
    .flatMap((line, y, arr) =>
      split(line, '').map<Vec2 | null>((v, x) =>
        v === '#' ? { x, y: arr.length - y - 1 } : null
      )
    )
    .filter((v: Vec2 | null): v is Vec2 => v !== null)

  const [xs, ys] = [points.map((v) => v.x), points.map((v) => v.y)]
  const [x0, x1] = minmax(...xs)
  const [y0, y1] = minmax(...ys)

  return {
    points,
    bounds: { x0, x1, y0, y1 },
  }
})

const lockShape = (
  grid: Map<string, string>,
  mover: Vec2 & { shape: typeof shapes[number] }
): number => {
  let maxY = -1
  for (const point of mover.shape.points) {
    maxY = Math.max(maxY, mover.y + point.y)
    grid.set(`${mover.x + point.x},${mover.y + point.y}`, '#')
  }
  return maxY
}

const solve = (input: string, loops: number) => {
  const movements = split(input, '').map((v) => (v === '<' ? -1 : 1))
  const grid = new Map<string, string>()
  let maxY = -1
  let move = 0
  let moveList = []
  for (let i = 0; i < 50_000; ++i) {
    const shape = shapes[i % shapes.length]
    const mover = { x: 2, y: maxY + 4, shape }

    while (true) {
      // Move side-to-side
      const nextMove = movements[move++ % movements.length]
      const willHit = mover.shape.points.some((point) => {
        const x = mover.x + point.x + nextMove
        const y = mover.y + point.y
        return x < 0 || x > 6 || grid.has(`${x},${y}`)
      })
      if (!willHit) mover.x += nextMove

      // Move down
      const willStop = mover.shape.points.some((point) => {
        const x = mover.x + point.x
        const y = mover.y + point.y - 1
        return y < 0 || grid.has(`${x},${y}`)
      })

      if (willStop) {
        const thisY = lockShape(grid, mover)
        const diff = thisY - maxY
        maxY = Math.max(thisY, maxY)
        moveList.push(diff)
        break
      } else {
        mover.y--
      }
    }
  }

  const regex = /(.+?)(\1{4})/
  const bigList = moveList.join(',')
  const match = regex.exec(bigList)

  const introIndex = bigList.indexOf(match![2])
  const intro = bigList.substring(0, introIndex).split(',').map(Number)
  const repeatable = match![2].replace(/^,/, '').split(',').map(Number)

  const introSum = intro.reduce((prev, curr) => Math.max(prev, prev + curr), 0)
  const repeatableVal = repeatable.reduce(
    (prev, curr) => Math.max(prev, prev + curr),
    0
  )

  const leftToDo = loops - intro.length
  const cycles = Math.floor(leftToDo / repeatable.length)
  const remainder = leftToDo % repeatable.length
  const cycleSum = cycles * repeatableVal
  const remainderSum = repeatable
    .slice(0, remainder)
    .reduce((prev, curr) => Math.max(prev, prev + curr), 0)

  return introSum + cycleSum + remainderSum
}

export const part1 = (input: string) => solve(input, 2022)
export const part2 = (input: string) => solve(input, 1_000_000_000_000)
