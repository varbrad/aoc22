import { describe, it, expect } from 'vitest'

import * as day22 from '../days/day22'
import { readDayInput } from '../utils/io'

describe('D22P1', () => {
  it('should solve example case', () => {
    const input = `        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5
`

    expect(day22.part1(input)).toBe(6032)
  })

  it('should solve input case', () => {
    const input = readDayInput(22)
    expect(day22.part1(input)).toBe(93226)
  })
})
