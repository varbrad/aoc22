import { split } from '../utils/string'

const parse = (input: string) => {
  const elves = new Set<string>()
  split(input).forEach((row, y) => {
    split(row, '').forEach((cell, x) => {
      if (cell === '#') {
        elves.add(`${x},${y}`)
      }
    })
  })
  return elves
}

const getBounds = (elves: Set<string>) =>
  Array.from(elves.keys()).reduce(
    (prev, curr) => {
      const [x, y] = split(curr, ',').map(Number)
      return {
        x0: Math.min(prev.x0, x),
        x1: Math.max(prev.x1, x),
        y0: Math.min(prev.y0, y),
        y1: Math.max(prev.y1, y),
      }
    },
    { x0: Infinity, x1: -Infinity, y0: Infinity, y1: -Infinity }
  )

const print = (elves: Set<string>) => {
  const bounds = getBounds(elves)

  let str = ''
  for (let y = bounds.y0; y <= bounds.y1; y++) {
    let row = ''
    for (let x = bounds.x0; x <= bounds.x1; x++) {
      row += elves.has(`${x},${y}`) ? '#' : '.'
    }
    str += row + '\n'
  }
  console.log(str)
}

export const part1 = (input: string) => {
  const checks = [
    [
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
    ],
    [
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
    [
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
    ],
    [
      { x: 1, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ],
  ]
  let elves = parse(input)
  for (let round = 0; round < 10; ++round) {
    const proposedMoves: { elf: string; move: string }[] = []
    for (const elf of elves.keys()) {
      const [x, y] = split(elf, ',').map(Number)
      const takenSpaces = checks.flatMap((check) =>
        check.map(({ x: dx, y: dy }) => elves.has(`${x + dx},${y + dy}`))
      )

      if (takenSpaces.every((taken) => !taken)) continue

      const check = checks.find((check) => {
        const isFree = check.every((c) => !elves.has(`${x + c.x},${y + c.y}`))
        return isFree
      })

      if (!check) continue
      proposedMoves.push({ elf, move: `${x + check[1].x},${y + check[1].y}` })
    }
    const finalMoves = proposedMoves.filter(
      (move, ix) =>
        !proposedMoves.some((m, i) => m.move === move.move && i !== ix)
    )
    const nextElves = new Set(elves)
    finalMoves.forEach(({ elf, move }) => {
      nextElves.delete(elf)
      nextElves.add(move)
    })
    elves = nextElves
    checks.push(checks.shift()!)
  }

  const bounds = getBounds(elves)
  const width = bounds.x1 - bounds.x0 + 1
  const height = bounds.y1 - bounds.y0 + 1
  return width * height - elves.size
}

export const part2 = (input: string) => {
  const checks = [
    [
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
    ],
    [
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
    [
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
    ],
    [
      { x: 1, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ],
  ]
  let elves = parse(input)
  for (let round = 0; round < 50_000; ++round) {
    const proposedMoves: { elf: string; move: string }[] = []
    for (const elf of elves.keys()) {
      const [x, y] = split(elf, ',').map(Number)
      const takenSpaces = checks.flatMap((check) =>
        check.map(({ x: dx, y: dy }) => elves.has(`${x + dx},${y + dy}`))
      )

      if (takenSpaces.every((taken) => !taken)) continue

      const check = checks.find((check) => {
        const isFree = check.every((c) => !elves.has(`${x + c.x},${y + c.y}`))
        return isFree
      })

      if (!check) continue
      proposedMoves.push({ elf, move: `${x + check[1].x},${y + check[1].y}` })
    }
    const finalMoves = proposedMoves.filter(
      (move, ix) =>
        !proposedMoves.some((m, i) => m.move === move.move && i !== ix)
    )

    if (finalMoves.length === 0) {
      return round + 1
    }

    const nextElves = new Set(elves)
    finalMoves.forEach(({ elf, move }) => {
      nextElves.delete(elf)
      nextElves.add(move)
    })
    elves = nextElves
    checks.push(checks.shift()!)
  }

  return -1
}
