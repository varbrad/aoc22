import { split } from '../../utils/string'

export type Valve = { name: string; rate: number; tunnels: string[] }

export const parse = (input: string): Record<string, Valve> =>
  split(input)
    .map((i) => {
      const result = /Valve (\w+)(?:.*)rate=(\d+)(?:.*)valves? (.*)/
        .exec(i)!
        .slice(1)
      return {
        name: result[0],
        rate: Number(result[1]),
        tunnels: result[2].split(', '),
      }
    })
    .reduce((prev, v) => ({ ...prev, [v.name]: v }), {})
