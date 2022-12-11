import { describe, expect, it } from 'vitest'

import * as day11 from '../days/day11'
import { readDayInput } from '../utils/io'

describe('D11P1', () => {
  it('should solve example case', () => {
    const input = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`
    expect(day11.part1(input)).toEqual(10605)
  })

  it('should solve input', () => {
    const input = readDayInput(11)
    expect(day11.part1(input)).toEqual(57348)
  })
})

describe('D11P2', () => {
  it('should solve example case', () => {
    const input = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`
    expect(day11.part2(input, 1)).toEqual(24)
    expect(day11.part2(input, 20)).toEqual(10197)
    expect(day11.part2(input, 1000)).toEqual(27019168)
    expect(day11.part2(input)).toEqual(2713310158)
  })

  it('should solve input', () => {
    const input = readDayInput(11)
    expect(day11.part2(input)).toEqual(14106266886)
  })
})
