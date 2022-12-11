import { array, product, sortDesc } from '../utils/array'
import { split } from '../utils/string'

const bigOlRegex =
  /Monkey (\d+):(?:.*)Starting items: ([\d, ]*)(?:.*)old ([+*]) (\d+|old)(?:.*)by (\d+)(?:.*)true:(?:.*)(\d+)(?:.*)(\d+)/s

const parse = (input: string) =>
  split(input, '\n\n').map((monkey) => {
    const [, id, items, operator, value, divisor, ifTrue, ifFalse] =
      bigOlRegex.exec(monkey)!

    return {
      id: Number(id),
      items: items.split(', ').map(Number),
      operation: {
        operator: operator as '+' | '*',
        value: value === 'old' ? ('old' as const) : Number(value),
      },
      test: {
        divisor: Number(divisor),
        ifTrue: Number(ifTrue),
        ifFalse: Number(ifFalse),
      },
    }
  })

const solve = (
  monkeys: ReturnType<typeof parse>,
  worryFn: (n: number) => number,
  rounds: number
) => {
  const inspections = array(monkeys.length).map(() => 0)
  for (let round = 0; round < rounds; round++) {
    monkeys.forEach(({ id, items, operation, test }) => {
      while (items.length > 0) {
        inspections[id]++
        const item = items.shift()!
        const value = operation.value === 'old' ? item : operation.value
        const newVal = worryFn(
          operation.operator === '*' ? item * value : item + value
        )
        const monkeyIx =
          newVal % test.divisor === 0 ? test.ifTrue : test.ifFalse
        monkeys[monkeyIx].items.push(newVal)
      }
    })
  }
  return product(sortDesc(inspections).slice(0, 2))
}

export const part1 = (input: string) =>
  solve(parse(input), (n) => Math.floor(n / 3), 20)

export const part2 = (input: string, rounds = 10_000) => {
  const monkeys = parse(input)
  const globalDivisor = monkeys.reduce(
    (prev, curr) => prev * curr.test.divisor,
    1
  )
  return solve(monkeys, (n) => n % globalDivisor, rounds)
}
