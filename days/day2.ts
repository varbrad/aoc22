import { sum } from '../utils/array'
import { split } from '../utils/string'

const translate = (item: string): number => {
  switch (item) {
    case 'A':
    case 'X':
      return 1
    case 'B':
    case 'Y':
      return 2
    case 'C':
    case 'Z':
      return 3
  }
  throw new Error('what?')
}

const whoWon = (opp: number, you: number) => {
  const diff = (you - opp + 3) % 3
  if (diff === 0) return 3
  if (diff === 1) return 6
  if (diff === 2) return 0
  throw new Error('what?')
}

const getNum = (opp: number, need: number) => {
  switch (need) {
    case 1:
      return ((opp + 1) % 3) + 1
    case 2:
      return opp
    case 3:
      return (opp % 3) + 1
  }
  throw new Error('what?')
}

const part1Scorer = ([opp, you]: number[]) => whoWon(opp, you) + you
const part2Scorer = ([opp, need]: number[]) =>
  getNum(opp, need) + (need - 1) * 3

const solve = (input: string, fn: (x: number[]) => number) =>
  sum(split(input).map((l) => fn(split(l, ' ').map(translate))))

export const part1 = (input: string) => solve(input, part1Scorer)
export const part2 = (input: string) => solve(input, part2Scorer)
