import { describe, expect, it } from 'vitest'

import * as day18 from '../days/day18'

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
})

describe('D19P1', () => {
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
})
