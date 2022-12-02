import { sortDesc, sum } from '../utils/array'

const parse = (input: string) =>
  sortDesc(
    input
      .trim()
      .split('\n\n')
      .map((group) => sum(group.split('\n')))
  )

export const part1 = (input: string) => parse(input)[0]
export const part2 = (input: string) => sum(parse(input).slice(0, 3))
