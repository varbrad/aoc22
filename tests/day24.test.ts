import { describe, expect, it } from 'vitest'

import * as day24 from '../days/day24'
import { readDayInput } from '../utils/io'

describe('D24P1', () => {
  it('should solve example case', () => {
    const input = `#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`
    expect(day24.part1(input)).toEqual(18)
  })

  it('should solve input case', () => {
    const input = readDayInput(24)
    expect(day24.part1(input)).toEqual(266)
  })
})

describe('D24P2', () => {
  it('should solve example case', () => {
    const input = `#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`
    expect(day24.part2(input)).toEqual(54)
  })

  it('should solve input case', () => {
    const input = readDayInput(24)
    expect(day24.part2(input)).toEqual(853)
  })
})
