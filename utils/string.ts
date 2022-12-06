export const split = (input: string, seperator = '\n') =>
  input.trim().split(seperator)

export const halve = (input: string) => [
  input.slice(0, input.length / 2),
  input.slice(input.length / 2),
]

export const concat = (a: string, b: string) => a + b
