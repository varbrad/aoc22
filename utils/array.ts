export const max = (arr: number[]) =>
  arr.reduce((acc, curr) => Math.max(acc, curr), arr[0] ?? -1)

export const sortDesc = (arr: number[]) => arr.sort((a, b) => b - a)

export const sum = (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0)
