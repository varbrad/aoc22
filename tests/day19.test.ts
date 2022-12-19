import { describe, expect, it } from 'vitest'

import * as day19 from '../days/day19'
import { readDayInput } from '../utils/io'

describe('D19P1', () => {
  it('should pass example case', () => {
    const input = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`
    expect(day19.part1(input)).toBe(33)
  })

  it('should pass input case', () => {
    const input = readDayInput(19)
    expect(day19.part1(input)).toBe(2160)
  })
})

describe.skip('D19P2', () => {
  it('should pass example case', () => {
    const input = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`
    expect(day19.part2(input)).toBe(62 * 56)
  })
})
