import { bench, describe } from 'vitest'

import * as day1 from './days/day1'
import * as day2 from './days/day2'
import * as day3 from './days/day3'
import * as day4 from './days/day4'
import * as day5 from './days/day5'
import * as day6 from './days/day6'
import * as day7 from './days/day7'
import * as day8 from './days/day8'
import { readDayInput } from './utils/io'

describe('Day 1', () => {
  bench('Part 1', () => void day1.part1(readDayInput(1)))
  bench('Part 2', () => void day1.part2(readDayInput(1)))
})

describe('Day 2', () => {
  bench('Part 1', () => void day2.part1(readDayInput(2)))
  bench('Part 2', () => void day2.part2(readDayInput(2)))
})

describe('Day 3', () => {
  bench('Part 1', () => void day3.part1(readDayInput(3)))
  bench('Part 2', () => void day3.part2(readDayInput(3)))
})

describe('Day 4', () => {
  bench('Part 1', () => void day4.part1(readDayInput(4)))
  bench('Part 2', () => void day4.part2(readDayInput(4)))
})

describe('Day 5', () => {
  bench('Part 1', () => void day5.part1(readDayInput(5)))
  bench('Part 2', () => void day5.part2(readDayInput(5)))
})

describe('Day 6', () => {
  bench('Part 1', () => void day6.part1(readDayInput(6)))
  bench('Part 2', () => void day6.part2(readDayInput(6)))
})

describe('Day 7', () => {
  bench('Part 1', () => void day7.part1(readDayInput(7)))
  bench('Part 2', () => void day7.part2(readDayInput(7)))
})

describe('Day 8', () => {
  bench('Part 1', () => void day8.part1(readDayInput(8)))
  bench('Part 2', () => void day8.part2(readDayInput(8)))
})
