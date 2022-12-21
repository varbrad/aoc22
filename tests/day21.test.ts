import { describe, it, expect } from 'vitest'

import * as day21 from '../days/day21'

describe('D21P1', () => {
  it('should solve example case', () => {
    const input = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`

    expect(day21.part1(input)).toBe(152)
  })
})

describe('D21P2', () => {
  it('should solve example case', () => {
    const input = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`

    expect(day21.part2(input)).toBe(301)
  })
})
