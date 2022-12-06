import { array } from '../utils/array'
import { concat } from '../utils/string'

const makeRegex = (n: number) =>
  new RegExp(
    array(n - 1)
      .map(
        (i) =>
          `((?!${array(i + 1)
            .map((ix) => '\\' + (ix + 1))
            .join('|')}).)`
      )
      .reduce(concat, '(.)')
  )

const solve = (input: string, n: number) =>
  input.trim().indexOf(input.trim().match(makeRegex(n))![0]) + n

export const part1 = (input: string) => solve(input, 4)
export const part2 = (input: string) => solve(input, 14)
