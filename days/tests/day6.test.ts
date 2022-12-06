import { describe, expect, it } from 'vitest'
import { readDayInput } from '../../utils/io'

import * as day6 from '../day6'

describe('D6P1', () => {
  it('should solve example case 1', () => {
    const input = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`

    expect(day6.part1(input)).toEqual(7)
  })

  it('should solve example case 2', () => {
    const input = `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`

    expect(day6.part1(input)).toEqual(10)
  })
})

describe('D6P2', () => {
  it('should solve example case 1', () => {
    const input = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`

    expect(day6.part2(input)).toEqual(19)
  })

  it('should solve example case 2', () => {
    const input = `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`

    expect(day6.part2(input)).toEqual(29)
  })
})
