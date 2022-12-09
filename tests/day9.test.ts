import { describe, expect, it } from 'vitest'
import { readDayInput } from '../utils/io'

import * as day9 from '../days/day9'

describe('D9P1', () => {
  it('should solve example case', () => {
    const input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

    expect(day9.part1(input)).toEqual(13)
  })

  it('should solve input case', () => {
    const input = readDayInput(9)
    expect(day9.part1(input)).toEqual(6332)
  })
})

describe('D9P2', () => {
  it('should solve example case 1', () => {
    const input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

    expect(day9.part2(input)).toEqual(1)
  })

  it('should solve example case 2', () => {
    const input = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

    expect(day9.part2(input)).toEqual(36)
  })

  it('should solve input case', () => {
    const input = readDayInput(9)
    expect(day9.part2(input)).toEqual(2511)
  })
})
