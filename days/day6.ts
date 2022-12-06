const makeRegex = (n: number) => {
  let rgx = '(.)'
  for (let i = 0; i < n - 1; i++) {
    rgx += `((?!${Array.from(
      { length: i + 1 },
      (_, ix) => '\\' + (ix + 1)
    ).join('|')}).)`
  }
  return new RegExp(rgx)
}

const solve = (input: string, n: number) =>
  input.trim().indexOf(input.trim().match(makeRegex(n))![0]) + n

export const part1 = (input: string) => solve(input, 4)
export const part2 = (input: string) => solve(input, 14)
