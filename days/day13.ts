import { castArray } from 'lodash'
import { split } from '../utils/string'

type Item = number | Item[]

const ordering = (a: Item[], b: Item[]): -1 | 1 | 0 => {
  for (let i = 0; i < Math.max(a.length, b.length); ++i) {
    const [aV, bV] = [a[i], b[i]] as [Item | undefined, Item | undefined]
    if (aV === undefined) return -1
    if (bV === undefined) return 1
    if (typeof aV === 'number' && typeof bV === 'number') {
      if (aV === bV) continue
      return aV < bV ? -1 : 1
    }
    const result = ordering(castArray(aV), castArray(bV))
    if (result !== 0) return result
  }
  return 0
}

const parse = (input: string) =>
  split(input, '\n\n').map(
    (n) => split(n).map((v) => JSON.parse(v)) as [Item[], Item[]]
  )

export const part1 = (input: string) =>
  parse(input).reduce(
    (acc, [a, b], ix) => acc + (ordering(a, b) === -1 ? ix + 1 : 0),
    0
  )

export const part2 = (input: string) =>
  [...parse(input).flat(), [[2]], [[6]]]
    .sort(ordering)
    .map((l) => JSON.stringify(l))
    .reduce(
      (acc, v, ix) => acc * (v === '[[2]]' || v === '[[6]]' ? ix + 1 : 1),
      1
    )
