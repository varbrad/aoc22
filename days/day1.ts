import { sortDesc, sum } from '../utils/array'
import { split } from '../utils/string'

const parse = (input: string) =>
  sortDesc(split(input, '\n\n').map((group) => sum(split(group))))

export const part1 = (input: string) => parse(input)[0]
export const part2 = (input: string) => sum(parse(input).slice(0, 3))
