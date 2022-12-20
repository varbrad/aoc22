import { sum } from '../utils/array'
import { split } from '../utils/string'

type Row = { v: number; ix: number }

const mix = (original: Row[], cycles = 1) => {
  const zeroIndex = original.findIndex(({ v: value }) => value === 0)
  const state = [
    ...original.slice(zeroIndex + 1),
    ...original.slice(0, zeroIndex),
  ]
  const len = state.length
  for (let i = 0; i < cycles; ++i) {
    for (const item of original) {
      if (item.v == 0) continue
      const curIx = state.findIndex(({ ix: i2 }) => i2 == item.ix)
      const nxtIx = (curIx + (item.v % len) + len) % len
      state.splice(curIx, 1)
      state.splice(nxtIx, 0, item)
    }
  }
  state.unshift({ v: 0, ix: 0 })
  return sum([1000, 2000, 3000].map((ix) => state[ix % (len + 1)].v))
}

const solve = (input: string, modifier: number = 1, cycles: number = 1) =>
  mix(
    split(input).map<Row>((r, i) => ({
      v: Number(r) * modifier,
      ix: i,
    })),
    cycles
  )

export const part1 = (input: string) => solve(input)
export const part2 = (input: string) => solve(input, 811589153, 10)
