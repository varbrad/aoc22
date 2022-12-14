import { bench, describe } from 'vitest'

import * as day1 from './days/day1'
import * as day2 from './days/day2'
import * as day3 from './days/day3'
import * as day4 from './days/day4'
import * as day5 from './days/day5'
import * as day6 from './days/day6'
import * as day7 from './days/day7'
import * as day8 from './days/day8'
import * as day9 from './days/day9'
import * as day10 from './days/day10'
import * as day11 from './days/day11'
import * as day12 from './days/day12'
import * as day13 from './days/day13'
import * as day14 from './days/day14'
import * as day15 from './days/day15'
import * as day16 from './days/day16'
import * as day17 from './days/day17'
import * as day18 from './days/day18'
import { readDayInput } from './utils/io'

describe('Day 1', () => {
  const input = readDayInput(1)
  bench('Part 1', () => void day1.part1(input))
  bench('Part 2', () => void day1.part2(input))
})

describe('Day 2', () => {
  const input = readDayInput(2)
  bench('Part 1', () => void day2.part1(input))
  bench('Part 2', () => void day2.part2(input))
})

describe('Day 3', () => {
  const input = readDayInput(3)
  bench('Part 1', () => void day3.part1(input))
  bench('Part 2', () => void day3.part2(input))
})

describe('Day 4', () => {
  const input = readDayInput(4)
  bench('Part 1', () => void day4.part1(input))
  bench('Part 2', () => void day4.part2(input))
})

describe('Day 5', () => {
  const input = readDayInput(5)
  bench('Part 1', () => void day5.part1(input))
  bench('Part 2', () => void day5.part2(input))
})

describe('Day 6', () => {
  const input = readDayInput(6)
  bench('Part 1', () => void day6.part1(input))
  bench('Part 2', () => void day6.part2(input))
})

describe('Day 7', () => {
  const input = readDayInput(7)
  bench('Part 1', () => void day7.part1(input))
  bench('Part 2', () => void day7.part2(input))
})

describe('Day 8', () => {
  const input = readDayInput(8)
  bench('Part 1', () => void day8.part1(input))
  bench('Part 2', () => void day8.part2(input))
})

describe('Day 9', () => {
  const input = readDayInput(9)
  bench('Part 1', () => void day9.part1(input))
  bench('Part 2', () => void day9.part2(input))
})

describe('Day 10', () => {
  const input = readDayInput(10)
  bench('Part 1', () => void day10.part1(input))
  bench('Part 2', () => void day10.part2(input))
})

describe('Day 11', () => {
  const input = readDayInput(11)
  bench('Part 1', () => void day11.part1(input))
  bench('Part 2', () => void day11.part2(input))
})

describe('Day 12', () => {
  const input = readDayInput(12)
  bench('Part 1', () => void day12.part1(input))
  bench('Part 2', () => void day12.part2(input))
})

describe('Day 13', () => {
  const input = readDayInput(13)
  bench('Part 1', () => void day13.part1(input))
  bench('Part 2', () => void day13.part2(input))
})

describe('Day 14', () => {
  const input = readDayInput(14)
  bench('Part 1', () => void day14.part1(input))
  bench('Part 2', () => void day14.part2(input))
})

// describe('Day 15', () => {
//   const input = readDayInput(15)
//   bench('Part 1', () => void day15.part1(input))
//   bench('Part 2', () => void day15.part2(input))
// })

// describe('Day 16', () => {
//   const input = readDayInput(16)
//   bench('Part 1', () => void day16.part1(input))
//   bench('Part 2', () => void day16.part2(input))
// })

describe('Day 17', () => {
  const input = readDayInput(17)
  bench('Part 1', () => void day17.part1(input))
  bench('Part 2', () => void day17.part2(input))
})

describe('Day 18', () => {
  const input = readDayInput(18)
  bench('Part 1', () => void day18.part1(input))
  bench('Part 2', () => void day18.part2(input))
})
