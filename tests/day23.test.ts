import { describe, expect, it } from 'vitest'

import * as day23 from '../days/day23'
import { readDayInput } from '../utils/io'

describe('D23P1', () => {
  it('should solve example case', () => {
    const input = `....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..`

    expect(day23.part1(input)).toBe(110)
  })

  it('should solve input case', () => {
    const input = readDayInput(23)

    expect(day23.part1(input)).toBe(3757)
  })
})

describe('D23P2', () => {
  it('should solve example case', () => {
    const input = `....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..`

    expect(day23.part2(input)).toBe(20)
  })

  it.skip('should solve input case', () => {
    const input = readDayInput(23)

    expect(day23.part2(input)).toBe(918)
  })
})
