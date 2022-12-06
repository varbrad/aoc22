import { array, pop } from '../utils/array'
import { split } from '../utils/string'

type Stack = string[]
type Move = { n: number; from: number; to: number }

interface State {
  stacks: Stack[]
  moves: Move[]
}

const parse = (input: string): State => {
  const [rawStacks, moves] = input.split('\n\n')
  const stackRows = rawStacks.split('\n')
  stackRows.pop()
  const stacks: State['stacks'] = []
  for (let y = 0; y < stackRows.length; y++) {
    for (let x = 1; x <= stackRows[y].length; x += 4) {
      const char = stackRows[y][x].trim()
      if (!char) continue
      const _x = (x - 1) / 4
      stacks[_x] = stacks[_x] || []
      stacks[_x].unshift(char)
    }
  }

  return {
    stacks,
    moves: split(moves).map((move) => {
      const result = move.match(/move (\d+) from (\d+) to (\d+)/)
      if (!result) throw new Error('???')
      const [, n, from, to] = result
      return { n: Number(n), from: Number(from) - 1, to: Number(to) - 1 }
    }),
  }
}

const solve = (
  input: string,
  moveFn: (move: Move, stacks: Stack[]) => void
) => {
  const { moves, stacks } = parse(input)
  moves.forEach((move) => moveFn(move, stacks))
  return stacks.map(pop).join('')
}

export const part1 = (input: string) =>
  solve(input, (move, stacks) =>
    array(move.n).forEach(() => stacks[move.to].push(stacks[move.from].pop()!))
  )

export const part2 = (input: string) =>
  solve(input, (move, stacks) =>
    stacks[move.to].push(...stacks[move.from].splice(-move.n))
  )
