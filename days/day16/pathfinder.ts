import { Valve } from './parse'

const pathfind = (
  valves: Record<string, Valve>,
  start: string,
  end: string
) => {
  const openList = [{ name: start, g: 0 }]
  const closedList: string[] = []
  while (openList.length > 0) {
    const current = openList.shift()!
    if (current.name === end) {
      return current.g
    }
    closedList.push(current.name)
    const neighbours = valves[current.name].tunnels
    for (const neighbour of neighbours) {
      if (closedList.includes(neighbour)) continue
      const isOnOpenList = openList.find((n) => n.name === neighbour)
      if (isOnOpenList) {
        isOnOpenList.g = Math.min(isOnOpenList.g, current.g + 1)
      } else {
        openList.push({ name: neighbour, g: current.g + 1 })
      }
    }
  }
  return -1
}

export const producePathfinderMap = (valves: Record<string, Valve>) => {
  const allValves = Object.values(valves).map((v) => v.name)
  const map: Map<string, number> = new Map()
  for (let i = 0; i < allValves.length - 1; i++) {
    const v1 = valves[allValves[i]]
    for (let j = i + 1; j < allValves.length; j++) {
      const v2 = valves[allValves[j]]
      const distance = pathfind(valves, v1.name, v2.name)
      map.set([v1.name, v2.name].sort().join('-'), distance)
    }
  }
  return map
}
