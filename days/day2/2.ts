import fs from 'fs'
import path from 'path'
import { sum } from '../../utils/array'

const whoWon = (opp: string, you: string) => {
  switch (opp) {
    case 'A':
      if (you === 'X') return 3
      return you === 'Y' ? 6 : 0
    case 'B':
      if (you === 'Y') return 3
      return you === 'Z' ? 6 : 0
    case 'C':
      if (you === 'Z') return 3
      return you === 'X' ? 6 : 0
  }
  throw new Error('what?')
}

const scoreGame = ([opp, you]: string[]) => {
  const result = whoWon(opp, you)
  return result + (you === 'X' ? 1 : you === 'Y' ? 2 : 3)
}

const getOwn = (result: number, opp: string) => {
  switch (result) {
    case 0:
      return opp === 'A' ? 3 : opp === 'B' ? 1 : 2
    case 3:
      return opp === 'A' ? 1 : opp === 'B' ? 2 : 3
    case 6:
      return opp === 'A' ? 2 : opp === 'B' ? 3 : 1
  }
  throw new Error('what?')
}

const scoreGameAlt = ([opp, need]: string[]) => {
  const result = need === 'X' ? 0 : need === 'Y' ? 3 : 6
  const own = getOwn(result, opp)

  return result + own
}

export const part1 = (input: string) => {
  const parsed = input
    .trim()
    .split('\n')
    .map((line) => scoreGame(line.split(' ')))

  return sum(parsed)
}
export const part2 = (input: string) => {
  const parsed = input
    .trim()
    .split('\n')
    .map((line) => scoreGameAlt(line.split(' ')))

  return sum(parsed)
}

export const solve = () => {
  const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8')
  console.log('D2P1 |', part1(input))
  console.log('D2P2 |', part2(input))
}
