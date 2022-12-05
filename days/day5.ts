import { split } from '../utils/string'

interface State {
  stacks: string[][]
  moves: { n: number; from: number; to: number }[]
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
      return { n: parseInt(n), from: parseInt(from), to: parseInt(to) }
    }),
  }
}

export const part1 = (input: string) => {
  const state = parse(input)
  state.moves.forEach((move) => {
    const movingStack = state.stacks[move.from - 1]
    const toStack = state.stacks[move.to - 1]
    for (let i = 0; i < move.n; i++) {
      toStack.push(movingStack.pop()!)
    }
  })
  return state.stacks.map((stack) => stack.pop()).join('')
}

export const part2 = (input: string) => {
  const state = parse(input)
  state.moves.forEach((move) => {
    const movingStack = state.stacks[move.from - 1]
    const toStack = state.stacks[move.to - 1]
    const tempStack = []
    for (let i = 0; i < move.n; i++) {
      tempStack.push(movingStack.pop()!)
    }
    toStack.push(...tempStack.reverse())
  })
  return state.stacks.map((stack) => stack.pop()).join('')
}
