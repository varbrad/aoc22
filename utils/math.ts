export const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b)
export const lcm = (a: number, b: number): number => (a * b) / gcd(a, b)

export const minmax = (...a: number[]): [min: number, max: number] => [
  Math.min(...a),
  Math.max(...a),
]

type BoundsLike = Record<'x1' | 'x2' | 'y1' | 'y2', number>
export const nextBounds = (a: BoundsLike, x: number, y: number) => {
  a.x1 = Math.min(a.x1, x)
  a.x2 = Math.max(a.x2, x)
  a.y1 = Math.min(a.y1, y)
  a.y2 = Math.max(a.y2, y)
}
