import { max, sortDesc, sum } from '../utils/array'
import { split } from '../utils/string'

type Grid = number[][]

const view = (
  map: Grid,
  x: number,
  y: number,
  delta: -1 | 1,
  dir: 'x' | 'y'
): [visible: boolean, distance: number] => {
  const val = map[y][x]
  const coord = dir === 'x' ? x : y
  let dist = 1
  for (let i = coord + delta; i >= 0 && i < map.length; i += delta) {
    const next = dir === 'x' ? map[y][i] : map[i][x]
    if (next >= val) return [false, dist]
    dist++
  }
  return [true, dist - 1]
}

const getViews = (
  map: Grid,
  x: number,
  y: number
): [visible: boolean, score: number] => {
  const [lV, lS] = view(map, x, y, -1, 'x')
  const [rV, rS] = view(map, x, y, 1, 'x')
  const [tV, tS] = view(map, x, y, -1, 'y')
  const [bV, bS] = view(map, x, y, 1, 'y')
  return [lV || rV || tV || bV, lS * rS * tS * bS]
}

export const part1 = (input: string) => {
  const map: Grid = split(input).map((r) => r.split('').map(Number))
  let visible = map.length * 4 - 4
  for (let y = 1; y < map.length - 1; y++) {
    for (let x = 1; x < map[y].length - 1; x++) {
      visible += getViews(map, x, y)[0] ? 1 : 0
    }
  }
  return visible
}

export const part2 = (input: string) => {
  const map: Grid = split(input).map((r) => r.split('').map(Number))
  let scenicScores: number[] = []
  for (let y = 1; y < map.length - 1; y++) {
    for (let x = 1; x < map[y].length - 1; x++) {
      const score = getViews(map, x, y)[1]
      scenicScores.push(score)
    }
  }
  return max(scenicScores)
}
