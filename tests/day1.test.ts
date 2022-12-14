import { bench, describe, expect, it } from 'vitest'

import * as day1 from '../days/day1'
import { readDayInput } from '../utils/io'

describe('D1P1', () => {
  it('should solve example case', () => {
    const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

    expect(day1.part1(input)).toEqual(24000)
  })

  it('should solve input case', () => {
    const input = readDayInput(1)
    expect(day1.part1(input)).toEqual(69501)
  })
})

describe('D1P2', () => {
  it('should solve example case', () => {
    const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

    expect(day1.part2(input)).toEqual(45000)
  })

  it('should solve input case', () => {
    const input = readDayInput(1)
    expect(day1.part2(input)).toEqual(202346)
  })
})
