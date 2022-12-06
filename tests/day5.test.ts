import { describe, expect, it } from 'vitest'
import { readDayInput } from '../utils/io'

import * as day5 from '../days/day5'

describe('D5P1', () => {
  it('should solve example case', () => {
    const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

    expect(day5.part1(input)).toEqual('CMZ')
  })
})

describe('D5P2', () => {
  it('should solve example case', () => {
    const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

    expect(day5.part2(input)).toEqual('MCD')
  })
})
