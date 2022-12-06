import { describe, expect, it } from 'vitest'
import { readDayInput } from '../utils/io'

import * as day3 from '../days/day3'

describe('D3P1', () => {
  it('should solve example case', () => {
    const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

    expect(day3.part1(input)).toEqual(157)
  })

  it('should solve real input', () => {
    const input = readDayInput(3)
    expect(day3.part1(input)).toEqual(8202)
  })
})

describe('D3P2', () => {
  it('should solve example case', () => {
    const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

    expect(day3.part2(input)).toEqual(70)
  })

  it('should solve real input', () => {
    const input = readDayInput(3)
    expect(day3.part2(input)).toEqual(2864)
  })
})
