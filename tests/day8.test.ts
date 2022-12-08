import { describe, expect, it } from 'vitest'
import { readDayInput } from '../utils/io'

import * as day8 from '../days/day8'

describe('D8P1', () => {
  it('should solve example case', () => {
    const input = `30373
25512
65332
33549
35390`

    expect(day8.part1(input)).toEqual(21)
  })

  it('should solve input case', () => {
    const input = readDayInput(8)
    expect(day8.part1(input)).toEqual(1820)
  })
})

describe('D8P2', () => {
  it('should solve example case', () => {
    const input = `30373
25512
65332
33549
35390`

    expect(day8.part2(input)).toEqual(8)
  })

  it('should solve input case', () => {
    const input = readDayInput(8)
    expect(day8.part2(input)).toEqual(385112)
  })
})
