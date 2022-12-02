import { max, sortDesc, sum } from '../../utils/array'
import fs from 'fs'
import path from 'path'

const parse = (input: string) =>
  sortDesc(
    input
      .trim()
      .split('\n\n')
      .map((group) =>
        group.split('\n').reduce((acc, curr) => acc + Number(curr), 0)
      )
  )

export const part1 = (input: string) => parse(input)[0]

export const part2 = (input: string) => sum(parse(input).slice(0, 3))

export const solve = () => {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8')
  console.log('D1P1 |', part1(input))
  console.log('D1P2 |', part2(input))
}
