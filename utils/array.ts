export const max = (arr: number[]) =>
  arr.reduce((acc, curr) => Math.max(acc, curr), arr[0] ?? -1)

export const sortDesc = (arr: number[]) => arr.sort((a, b) => b - a)

export const sum = (arr: unknown[]): number =>
  arr.reduce<number>((acc, curr) => acc + Number(curr), 0)

export const chunk = <T>(arr: T[], size: number): T[][] => {
  const chunks = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

export const array = (length: number) => Array.from({ length }).map((_, i) => i)

export const pop = <T>(arr: T[]) => arr.pop()
