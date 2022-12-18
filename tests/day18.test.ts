import { describe, expect, it } from 'vitest'

import * as day18 from '../days/day18'
import { readDayInput } from '../utils/io'

describe('D18P1', () => {
  it('should solve simple case', () => {
    const input = `1,1,1\n2,1,1`
    expect(day18.part1(input)).toEqual(10)
  })

  it('should solve example case', () => {
    const input = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`

    expect(day18.part1(input)).toEqual(64)
  })

  it('should solve input case', () => {
    const input = readDayInput(18)
    expect(day18.part1(input)).toEqual(4500)
  })
})

describe('D18P2', () => {
  it('should solve example case', () => {
    const input = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`

    expect(day18.part2(input)).toEqual(58)
  })

  it('should solve input case', () => {
    const input = readDayInput(18)
    expect(day18.part2(input)).toEqual(2558)
  })
})
