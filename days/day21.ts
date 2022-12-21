import { e } from 'vitest/dist/index-9f5bc072'
import { split } from '../utils/string'

type OpType = '+' | '-' | '*' | '/'
type OpMonkey = { type: OpType; name: string; a: string; b: string }
type Monkey =
  | { type: 'number'; name: string; value: number }
  | OpMonkey
  | { type: 'human'; name: string }

const parseNumeric = /(\w+): (\d+)/
const parseComplex = /(\w+): (\w+) ([+\-*/]) (\w+)/
const parse = (input: string) =>
  split(input)
    .map<Monkey>((inp) => {
      const numeric = parseNumeric.exec(inp)
      if (numeric)
        return { type: 'number', name: numeric[1], value: Number(numeric[2]) }
      const [, name, a, op, b] = parseComplex.exec(inp)!
      return { type: op as OpType, name, a, b }
    })
    .reduce<Record<string, Monkey>>((prev, monkey) => {
      prev[monkey.name] = monkey
      return prev
    }, {})

export const part1 = (input: string) => {
  const monkeys = parse(input)
  const evaluate = (monkey: Monkey): number => {
    if (monkey.type === 'number') return monkey.value
    if (monkey.type === 'human') return -1
    const a = evaluate(monkeys[monkey.a])
    const b = evaluate(monkeys[monkey.b])
    switch (monkey.type) {
      case '+':
        return a + b
      case '-':
        return a - b
      case '*':
        return a * b
      case '/':
        return a / b
    }
  }

  return evaluate(monkeys['root'])
}

export const part2 = (input: string) => {
  const monkeys = parse(input)
  monkeys['humn'] = { type: 'human', name: 'humn' }
  const evaluate = (monkey: Monkey): number | 'error!' => {
    if (monkey.type === 'number') return monkey.value
    if (monkey.type === 'human') return 'error!'
    const a = evaluate(monkeys[monkey.a])
    const b = evaluate(monkeys[monkey.b])
    if (a === 'error!' || b === 'error!') return 'error!'
    switch (monkey.type) {
      case '+':
        return a + b
      case '-':
        return a - b
      case '*':
        return a * b
      case '/':
        return a / b
    }
  }

  type AlgResult =
    | number
    | 'humn'
    | { type: OpType; a: AlgResult; b: AlgResult }
  const constructFormula = (monkey: Monkey): AlgResult => {
    if (monkey.type === 'number') return monkey.value
    if (monkey.type === 'human') return 'humn'
    const a = constructFormula(monkeys[monkey.a])
    const b = constructFormula(monkeys[monkey.b])
    if (typeof a !== 'number' || typeof b !== 'number')
      return { type: monkey.type, a, b }
    switch (monkey.type) {
      case '+':
        return a + b
      case '-':
        return a - b
      case '*':
        return a * b
      case '/':
        return a / b
    }
  }

  const root = monkeys['root'] as OpMonkey
  const valA = evaluate(monkeys[root.a])
  const valB = evaluate(monkeys[root.b])

  const target = valA === 'error!' ? (valB as number) : valA
  const formula = constructFormula(
    valA === 'error!' ? monkeys[root.a] : monkeys[root.b]
  )

  let humn = target
  let cur = formula
  while (true) {
    if (typeof cur === 'number') throw new Error('huh?')
    if (cur === 'humn') break
    switch (cur.type) {
      case '/': {
        const isBDivisor = typeof cur.b === 'number'
        if (isBDivisor) {
          humn *= cur.b as number
        } else {
          humn *= 1 / (cur.a as number)
        }
        cur = isBDivisor ? cur.a : cur.b
        continue
      }
      case '+': {
        const isBAddend = typeof cur.b === 'number'
        humn -= isBAddend ? (cur.b as number) : (cur.a as number)
        cur = isBAddend ? cur.a : cur.b
        continue
      }
      case '*': {
        const isBFactor = typeof cur.b === 'number'
        humn /= isBFactor ? (cur.b as number) : (cur.a as number)
        cur = isBFactor ? cur.a : cur.b
        continue
      }
      case '-': {
        const isBSubtrahend = typeof cur.b === 'number'
        if (isBSubtrahend) {
          humn += cur.b as number
        } else {
          humn = (cur.a as number) - humn
        }
        cur = isBSubtrahend ? cur.a : cur.b
        continue
      }
    }
  }

  return humn
}
