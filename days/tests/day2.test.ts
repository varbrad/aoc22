import { describe, expect, it } from 'vitest'

import * as day2 from '../day2'

describe('D2P1', () => {
  it('should solve example case', () => {
    const input = 'A Y\nB X\nC Z'
    expect(day2.part1(input)).toEqual(15)
  })
})

describe('D2P2', () => {
  it('should solve example case', () => {
    const input = 'A Y\nB X\nC Z'
    expect(day2.part2(input)).toEqual(12)
  })
})
