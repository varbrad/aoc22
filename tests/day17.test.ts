import { describe, expect, it } from 'vitest'

import * as day17 from '../days/day17'
import { readDayInput } from '../utils/io'

describe('D17P1', () => {
  it('should solve example case', () => {
    const input = '>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>'
    expect(day17.part1(input)).toEqual(3068)
  })

  it('should solve input case', () => {
    const input = readDayInput(17)
    expect(day17.part1(input)).toEqual(3239)
  })
})

describe('D17P2', () => {
  it('should solve example case', () => {
    const input = '>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>'
    expect(day17.part2(input)).toEqual(1514285714288)
  })
})
