import { d } from 'vitest/dist/index-9f5bc072'
import { sum } from '../utils/array'
import { split } from '../utils/string'

type AddX = { type: 'addx'; value: number }
type Noop = { type: 'noop' }
type Instruction = AddX | Noop

export const part1 = (input: string) => {
  const instructions: Instruction[] = split(input).map((line) => {
    const result = line.match(/(addx|noop) ?(-?\d+)?/)
    const [, type, value] = result!
    return type === 'addx'
      ? { type: 'addx', value: Number(value) }
      : { type: 'noop' }
  })

  let cycle = 1
  let x = 1
  let log = [{ cycle, x }]

  instructions.forEach((ins) => {
    switch (ins.type) {
      case 'noop':
        cycle++
        break
      case 'addx':
        cycle += 2
        x += ins.value
        break
    }
    log.push({ cycle, x })
  })

  const cycles = [20, 60, 100, 140, 180, 220]
  return sum(
    cycles.map((cycle) => {
      const overIndex = log.findIndex((l) => l.cycle > cycle)
      return cycle * log[overIndex - 1].x
    })
  )
}

export const part2 = (input: string) => {
  const instructions: Instruction[] = split(input).map((line) => {
    const result = line.match(/(addx|noop) ?(-?\d+)?/)
    const [, type, value] = result!
    return type === 'addx'
      ? { type: 'addx', value: Number(value) }
      : { type: 'noop' }
  })

  let cycle = 1
  let x = 1
  let output = ''

  const draw = () => {
    const cyc = (cycle - 1) % 40
    output += x >= cyc - 1 && x <= cyc + 1 ? '#' : '.'
    if (cycle % 40 === 0) output += '\n'
  }

  instructions.forEach((ins) => {
    switch (ins.type) {
      case 'noop':
        draw()
        cycle++
        break
      case 'addx':
        for (let i = 0; i < 2; i++) {
          draw()
          cycle++
        }
        x += ins.value
        break
    }
  })

  return output.trim()
}
