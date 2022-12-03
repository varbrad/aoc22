import { chunk, sum } from '../utils/array'
import { halve, split } from '../utils/string'

const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const letterValue = (letter: string) =>
  letters.findIndex((l) => l === letter) + 1

export const part1 = (input: string) =>
  sum(
    split(input).map((rucksack) => {
      const [a, b] = halve(rucksack)
      const letter = a.split('').find((l) => b.includes(l))
      if (!letter) throw new Error('No letter found')
      return letterValue(letter)
    })
  )

export const part2 = (input: string) =>
  sum(
    chunk(split(input), 3).map((group) => {
      const letter = group[0]
        .split('')
        .find((l) => group[1].includes(l) && group[2].includes(l))
      if (!letter) throw new Error('No letter found')
      return letterValue(letter)
    })
  )
