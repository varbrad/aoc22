import { sum } from '../utils/array'
import { split } from '../utils/string'

const regex = /^(\d+)-(\d+),(\d+)-(\d+)$/

const format = (input: string) =>
  split(input).map((l) => l.match(regex)!.slice(1, 5).map(Number))

const contains = ([a0, a1, b0, b1]: number[]) =>
  (a0 >= b0 && a1 <= b1) || (b0 >= a0 && b1 <= a1) ? 1 : 0

const overlaps = ([a0, a1, b0, b1]: number[]) =>
  (a0 >= b0 && a0 <= b1) || (b0 >= a0 && b0 <= a1) ? 1 : 0

export const part1 = (input: string) => sum(format(input).map(contains))
export const part2 = (input: string) => sum(format(input).map(overlaps))
