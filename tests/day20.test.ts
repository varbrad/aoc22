import { describe, expect, it } from 'vitest'

import * as day20 from '../days/day20'
import { readDayInput } from '../utils/io'

describe('D20P1', () => {
  it('should pass example case', () => {
    const input = `1
2
-3
3
-2
0
4`
    expect(day20.part1(input)).toEqual(3)
  })

  it.skip('should pass input case', () => {
    const input = readDayInput(20)
    expect(day20.part1(input)).toEqual(27726)
  })
})

// describe('D20P2', () => {
//   it('should pass example case', () => {
//     const input = `1
// 2
// -3
// 3
// -2
// 0
// 4`
//     expect(day20.part2(input)).toEqual(1623178306)
//   })

//   it('should pass input case', () => {
//     const input = readDayInput(20)
//     expect(day20.part2(input)).toEqual(4275451658004)
//   })
// })
