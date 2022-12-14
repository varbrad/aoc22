export const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b)
export const lcm = (a: number, b: number): number => (a * b) / gcd(a, b)

export const minmax = (...a: number[]): [min: number, max: number] => [
  Math.min(...a),
  Math.max(...a),
]
