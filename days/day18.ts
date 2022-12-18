import { first } from 'lodash'
import { array } from '../utils/array'
import { minmax } from '../utils/math'
import { split } from '../utils/string'

const solve = (input: string) => {
  const map = new Set<string>()
  const count = split(input).reduce((prev, row) => {
    const [x, y, z] = row.split(',').map(Number)
    map.add(row)
    return (
      prev +
      array(6).reduce<number>(
        (prev, i) =>
          map.has(
            `${x + (i === 0 ? -1 : i === 1 ? 1 : 0)},${
              y + (i === 2 ? -1 : i === 3 ? 1 : 0)
            },${z + (i === 4 ? -1 : i === 5 ? 1 : 0)}`
          )
            ? prev - 2
            : prev,
        6
      )
    )
  }, 0)

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
  for (let i = 0; i < 6; i++) {
    const [ax, ay, az] = [
      x + (i === 0 ? -1 : i === 1 ? 1 : 0),
      y + (i === 2 ? -1 : i === 3 ? 1 : 0),
      z + (i === 4 ? -1 : i === 5 ? 1 : 0),
    ]
    const res = pruneToInterior(map, xs, ys, zs, ax, ay, az, startSet)
    if (res === 'outside') return 'outside'
  }
  return startSet
}

const floodFill = (
  map: Set<string>,
  x: number,
  y: number,
  z: number,
  set: Set<string>
) => {
  if (map.has(`${x},${y},${z}`) || set.has(`${x},${y},${z}`)) return set
  set.add(`${x},${y},${z}`)
  for (let i = 0; i < 6; i++) {
    const [ax, ay, az] = [
      x + (i === 0 ? -1 : i === 1 ? 1 : 0),
      y + (i === 2 ? -1 : i === 3 ? 1 : 0),
      z + (i === 4 ? -1 : i === 5 ? 1 : 0),
    ]
    floodFill(map, ax, ay, az, set)
  }
  return set
}

export const part1 = (input: string) => solve(input)[1]

export const part2 = (input: string) => {
  const [map] = solve(input)
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

  const knownInsidePoints = new Set<string>()
  const interiorPoints = Array.from(voidMap.values()).filter((v) => {
    if (knownInsidePoints.has(v)) return true
    const [x, y, z] = v.split(',').map(Number)
    const result = pruneToInterior(map, xs, ys, zs, x, y, z, new Set<string>())
    if (result === 'outside') return false
    result.forEach((v) => knownInsidePoints.add(v))
    return true
  })

  interiorPoints.forEach((v) => map.add(v))
  return solve(Array.from(map.values()).join('\n'))[1]
}
