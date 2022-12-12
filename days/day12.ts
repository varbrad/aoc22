import { array } from '../utils/array'
import { split } from '../utils/string'

type Node = {
  type: 'start' | 'end' | 'node'
  height: number
  x: number
  y: number
}

type OpenList = {
  node: Node
  g: number
}

const solve = (
  input: string,
  isStart: (n: Node) => boolean,
  isEnd: (n: Node) => boolean,
  isValidMove: (a: Node, b: Node) => boolean
) => {
  const nodes: Node[] = split(input).flatMap((n, y) =>
    split(n, '').map((v, x) => {
      const height = v === 'S' ? 0 : v === 'E' ? 25 : v.charCodeAt(0) - 97
      const type = v === 'S' ? 'start' : v === 'E' ? 'end' : 'node'
      return { height, type, x, y }
    })
  )

  const getNode = (x: number, y: number) =>
    nodes.find((n) => n.x === x && n.y === y)

  const getValidNeighbours = (node: Node) =>
    [
      getNode(node.x - 1, node.y),
      getNode(node.x + 1, node.y),
      getNode(node.x, node.y - 1),
      getNode(node.x, node.y + 1),
    ].filter((n) => n && isValidMove(n, node)) as Node[]

  const openList: OpenList[] = [{ node: nodes.find(isStart)!, g: 0 }]
  const closedList: Map<string, boolean> = new Map()
  while (openList.length > 0) {
    openList.sort((a, b) => a.g - b.g)
    const item = openList.shift()!
    const { node, g } = item
    if (isEnd(node)) return g
    closedList.set(`${node.x},${node.y}`, true)
    for (const neighbour of getValidNeighbours(node)) {
      const onClosedList = closedList.has(`${neighbour.x},${neighbour.y}`)
      if (onClosedList) continue
      const onOpenList = openList.find(
        (n) => n.node.x === neighbour.x && n.node.y === neighbour.y
      )
      if (!onOpenList) {
        openList.push({
          node: neighbour,
          g: g + 1,
        })
      } else if (g + 1 < onOpenList.g) onOpenList.g = g + 1
    }
  }
  return -1
}

export const part1 = (input: string) =>
  solve(
    input,
    (n) => n.type === 'start',
    (n) => n.type === 'end',
    (a, b) => a.height <= b.height + 1
  )

export const part2 = (input: string) =>
  solve(
    input,
    (n) => n.type === 'end',
    (n) => n.height === 0,
    (a, b) => b.height <= a.height + 1
  )
