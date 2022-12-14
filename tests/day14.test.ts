import { describe, expect, it } from 'vitest'

import * as day14 from '../days/day14'

describe('D14P1', () => {
  it('should solve example case', () => {
    const input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`
    expect(day14.part1(input)).toEqual(24)
  })
})

describe('D14P2', () => {
  it('should solve example case', () => {
    const input = `498,4 -> 498,6 -> 496,6
  503,4 -> 502,4 -> 502,9 -> 494,9`
    expect(day14.part2(input)).toEqual(93)
  })
})
