import { describe, expect, it } from 'vitest'
import { readDayInput } from '../utils/io'

import * as day2 from '../days/day2'

describe('D2P1', () => {
  it('should solve example case', () => {
    const input = 'A Y\nB X\nC Z'
    expect(day2.part1(input)).toEqual(15)
  })

  it('should solve real input', () => {
    const input = readDayInput(2)
    expect(day2.part1(input)).toEqual(12679)
  })
})

describe('D2P2', () => {
  it('should solve example case', () => {
    const input = 'A Y\nB X\nC Z'
    expect(day2.part2(input)).toEqual(12)
  })

  it('should solve real input', () => {
    const input = readDayInput(2)
    expect(day2.part2(input)).toEqual(14470)
  })
})
