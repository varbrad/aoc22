import { minmax } from '../utils/math'
import { split } from '../utils/string'

const solve = (input: string) => {
  const map = new Set<string>()
  let count = 0
  split(input).forEach((row) => {
    const [x, y, z] = row.split(',').map(Number)
    let faces = 6
    const left = map.has(`${x - 1},${y},${z}`)
    const right = map.has(`${x + 1},${y},${z}`)
    const top = map.has(`${x},${y - 1},${z}`)
    const bottom = map.has(`${x},${y + 1},${z}`)
    const front = map.has(`${x},${y},${z - 1}`)
    const back = map.has(`${x},${y},${z + 1}`)

    if (left) faces -= 2
    if (right) faces -= 2
    if (top) faces -= 2
    if (bottom) faces -= 2
    if (front) faces -= 2
    if (back) faces -= 2

    count += faces

    map.add(`${x},${y},${z}`)
  })

  return [map, count] as const
}

const pruneToInterior = (
  map: Set<string>,
  xs: [number, number],
  ys: [number, number],
  zs: [number, number],
  x: number,
  y: number,
  z: number,
  startSet: Set<string>
): Set<string> | 'outside' => {
  if (map.has(`${x},${y},${z}`) || startSet.has(`${x},${y},${z}`))
    return startSet
  if (
    x <= xs[0] ||
    x >= xs[1] ||
    y <= ys[0] ||
    y >= ys[1] ||
    z <= zs[0] ||
    z >= zs[1]
  )
    return 'outside'
  startSet.add(`${x},${y},${z}`)
  const a = pruneToInterior(map, xs, ys, zs, x - 1, y, z, startSet)
  if (a === 'outside') return 'outside'
  const b = pruneToInterior(map, xs, ys, zs, x + 1, y, z, startSet)
  if (b === 'outside') return 'outside'
  const c = pruneToInterior(map, xs, ys, zs, x, y - 1, z, startSet)
  if (c === 'outside') return 'outside'
  const d = pruneToInterior(map, xs, ys, zs, x, y + 1, z, startSet)
  if (d === 'outside') return 'outside'
  const e = pruneToInterior(map, xs, ys, zs, x, y, z - 1, startSet)
  if (e === 'outside') return 'outside'
  const f = pruneToInterior(map, xs, ys, zs, x, y, z + 1, startSet)
  if (f === 'outside') return 'outside'

  return startSet
}

export const part1 = (input: string) => solve(input)[1]

export const part2 = (input: string) => {
  const [map, totalSurface] = solve(input)
  const mapValues = Array.from(map.values())
  const xs = minmax(...mapValues.map((v) => Number(v.split(',')[0])))
  const ys = minmax(...mapValues.map((v) => Number(v.split(',')[1])))
  const zs = minmax(...mapValues.map((v) => Number(v.split(',')[2])))

  const voidMap = new Set<string>()
  for (let z = zs[0]; z < zs[1]; z++) {
    for (let y = ys[0]; y < ys[1]; y++) {
      for (let x = xs[0]; x < xs[1]; x++) {
        const isVoid = map.has(`${x},${y},${z}`) === false
        if (isVoid) voidMap.add(`${x},${y},${z}`)
      }
    }
  }

  const firstVoid = Array.from(voidMap.values()).filter((v) => {
    const [x, y, z] = v.split(',').map(Number)
    const result = pruneToInterior(map, xs, ys, zs, x, y, z, new Set<string>())
    if (result !== 'outside') return true
    return false
  })

  firstVoid.forEach((v) => map.add(v))
  return solve(Array.from(map.values()).join('\n'))[1]
}
