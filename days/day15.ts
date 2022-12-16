import { split } from '../utils/string'

type Vec2 = { x: number; y: number }

const manhattan = (a: Vec2, b: Vec2) =>
  Math.abs(a.x - b.x) + Math.abs(a.y - b.y)

const parse = (input: string) =>
  split(input)
    .map((row) =>
      /x=(-?\d+), y=(-?\d+)(?:.*)x=(-?\d+), y=(-?\d+)/
        .exec(row)!
        .slice(1, 5)
        .map(Number)
    )
    .map(([x1, y1, x2, y2]) => {
      const sensor = { x: x1, y: y1 }
      const beacon = { x: x2, y: y2 }
      const distance = manhattan(sensor, beacon)
      return { sensor, beacon, distance }
    })

export const part1 = (input: string, y = 2_000_000) => {
  const items = parse(input)
  const leftMost = Math.min(
    ...items.map(({ sensor, distance }) => sensor.x - distance)
  )
  const rightMost = Math.max(
    ...items.map(({ sensor, distance }) => sensor.x + distance)
  )

  let count = 0
  for (let x = leftMost; x <= rightMost; ++x) {
    const v = { x, y }
    const isBeaconOrSensor = items.some(
      (i) =>
        (i.sensor.x === x && i.sensor.y === y) ||
        (i.beacon.x === x && i.beacon.y === y)
    )
    if (isBeaconOrSensor) continue
    const isWithin = items.some(
      (item) => manhattan(v, item.sensor) <= item.distance
    )
    if (isWithin) count++
  }
  return count
}

export const part2 = (input: string, bounds = 4_000_000) => {
  const items = parse(input)
  const bsMap = new Map<string, boolean>()
  items.forEach(({ beacon, sensor }) => {
    bsMap.set(`${beacon.x},${beacon.y}`, true)
    bsMap.set(`${sensor.x},${sensor.y}`, true)
  })
  for (let y = 0; y <= bounds; ++y) {
    for (let x = 0; x <= bounds; ++x) {
      const v = { x, y }
      const isBeaconOrSensor = bsMap.has(`${x},${y}`)
      if (isBeaconOrSensor) continue
      const isWithin = items.find(
        (item) => manhattan(v, item.sensor) <= item.distance
      )
      if (isWithin) {
        x =
          isWithin.sensor.x +
          isWithin.distance -
          Math.abs(y - isWithin.sensor.y)
        continue
      }
      return x * 4_000_000 + y
    }
  }
  return -1
}
