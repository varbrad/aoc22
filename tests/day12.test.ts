import { describe, it, expect } from 'vitest'

import * as day12 from '../days/day12'
import { readDayInput } from '../utils/io'

describe('D12P1', () => {
  it('should solve the test case', () => {
    const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`

    expect(day12.part1(input)).toEqual(31)
  })

  it('should solve the input case', () => {
    const input = readDayInput(12)
    expect(day12.part1(input)).toEqual(528)
  })
})

describe('D12P2', () => {
  it('should solve the test case', () => {
    const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`

    expect(day12.part2(input)).toEqual(29)
  })

  it('should solve the input case', () => {
    const input = readDayInput(12)
    expect(day12.part2(input)).toEqual(522)
  })
})
