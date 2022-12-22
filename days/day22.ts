import { split } from '../utils/string'

type NodeNeighbours = { top: Node; left: Node; right: Node; bottom: Node }
type Node = {
  type: 'wall' | 'space'
  x: number
  y: number
  neighbours: NodeNeighbours
}

const getNext = (
  nodes2D: (Omit<Node, 'neighbours'> | null)[][],
  x: number,
  y: number,
  dx: number,
  dy: number
): Node => {
  let _x = x - 1 + dx
  let _y = y - 1 + dy
  while (true) {
    const nodeAtSpot = nodes2D[_y]?.[_x]
    if (nodeAtSpot) return nodeAtSpot as Node
    _x += dx
    _y += dy
    if (_y >= nodes2D.length) _y = 0
    if (_y < 0) _y = nodes2D.length - 1
    if (_x >= nodes2D[_y].length) _x = 0
    if (_x < 0) _x = nodes2D[_y].length - 1
  }
}

const getNeighbours = (
  nodes2D: (Omit<Node, 'neighbours'> | null)[][],
  node: Omit<Node, 'neighbours'>
): NodeNeighbours => {
  const left = getNext(nodes2D, node.x, node.y, -1, 0)
  const right = getNext(nodes2D, node.x, node.y, 1, 0)
  const top = getNext(nodes2D, node.x, node.y, 0, -1)
  const bottom = getNext(nodes2D, node.x, node.y, 0, 1)

  return { top, bottom, left, right }
}

const parse = (input: string) => {
  const [rawGrid, rawPath] = input.split('\n\n')
  const fil = rawGrid.split('\n').reduce((acc, line) => {
    return Math.max(acc, line.length)
  }, 0)

  const nodes2D: (Omit<Node, 'neighbours'> | null)[][] = []
  rawGrid.split('\n').forEach((line, y) => {
    const nodes: (Omit<Node, 'neighbours'> | null)[] = []
    const bits = line.split('')
    while (bits.length < fil) bits.push(' ')
    bits.forEach((bit, x) => {
      if (bit === ' ') {
        nodes.push(null)
        return
      }
      const node: Omit<Node, 'neighbours'> = {
        x: x + 1,
        y: y + 1,
        type: bit === '#' ? 'wall' : 'space',
      }
      nodes.push(node)
    })
    nodes2D.push(nodes)
  })

  const nodes = new Map<string, Node>()
  for (let y = 0; y < nodes2D.length; ++y) {
    for (let x = 0; x < nodes2D[y].length; ++x) {
      const node = nodes2D[y][x] as Node | null
      if (!node) continue

      const neighbours = getNeighbours(nodes2D, node)
      node.neighbours = neighbours

      nodes.set(`${node.x},${node.y}`, node)
    }
  }

  const regex = /(\d+|[RL])/g
  const moves = Array.from(rawPath.matchAll(regex)).map(([v]) => {
    if (v === 'R') return 'right'
    if (v === 'L') return 'left'
    return Number(v)
  })

  const x = nodes2D[0].findIndex((n) => n?.type === 'space')! + 1

  return { x, y: 1, dir: [1, 0], nodes, moves }
}

export const part1 = (input: string) => {
  const state = parse(input)
  moves: for (const move of state.moves) {
    if (typeof move === 'number') {
      const [dx, dy] = state.dir
      let current = state.nodes.get(`${state.x},${state.y}`)!
      for (let i = 0; i < move; ++i) {
        const nextNode =
          dx === 0
            ? dy === 1
              ? current.neighbours.bottom
              : current.neighbours.top
            : dx === 1
            ? current.neighbours.right
            : current.neighbours.left

        if (nextNode.type === 'wall') break
        state.x = nextNode.x
        state.y = nextNode.y
        current = nextNode
      }
    } else {
      const [dx, dy] = state.dir
      if (move === 'left') {
        state.dir = [dy, -dx]
      } else {
        state.dir = [-dy, dx]
      }
    }
  }

  const [dx, dy] = state.dir
  const yScore = state.y * 1000
  const xScore = state.x * 4
  const dirScore = dx === 0 ? (dy === 1 ? 1 : 3) : dx === 1 ? 0 : 2

  return yScore + xScore + dirScore
}
