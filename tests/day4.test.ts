import { describe, expect, it } from 'vitest'
import { readDayInput } from '../utils/io'

import * as day4 from '../days/day4'

describe('D4P1', () => {
  it('should solve example case', () => {
    const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

    expect(day4.part1(input)).toEqual(2)
  })

  it('should solve real case', () => {
    const input = readDayInput(4)

    expect(day4.part1(input)).toEqual(550)
  })
})

describe('D4P2', () => {
  it('should solve example case', () => {
    const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

    expect(day4.part2(input)).toEqual(4)
  })

  it('should solve example case', () => {
    const input = readDayInput(4)

    expect(day4.part2(input)).toEqual(931)
  })
})
