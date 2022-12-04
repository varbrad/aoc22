import { split } from '../utils/string'

const format = (input: string) =>
  split(input).map((l) => l.split(',').map((i) => i.split('-').map(Number)))

const contains = ([[a0, a1], [b0, b1]]: number[][]) =>
  (a0 >= b0 && a1 <= b1) || (b0 >= a0 && b1 <= a1)

const overlaps = ([[a0, a1], [b0, b1]]: number[][]) =>
  (a0 >= b0 && a0 <= b1) || (b0 >= a0 && b0 <= a1)

export const part1 = (input: string) => format(input).filter(contains).length
export const part2 = (input: string) => format(input).filter(overlaps).length
