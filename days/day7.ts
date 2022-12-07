import { set } from 'lodash'
import { sum } from '../utils/array'
import { split } from '../utils/string'

interface FileSystem {
  [key: string]: FileSystem | number
}

const makeFS = (input: string): FileSystem => {
  const lines = split(input)
  const fs: FileSystem = {}
  let path = ['/']
  lines.forEach((line) => {
    if (line.startsWith('$ ls')) return
    if (line.startsWith('$ cd ')) {
      const segment = line.replace('$ cd ', '')
      return segment === '/'
        ? (path = ['/'])
        : segment === '..'
        ? path.pop()
        : path.push(segment)
    }

    const [size, name] = line.split(' ')
    set(fs, [...path, name], Number(size))
  })

  return fs
}

const getDirectorySize = (fs: FileSystem): number =>
  Object.values(fs).reduce<number>((prev, value) => {
    return prev + (typeof value === 'number' ? value : getDirectorySize(value))
  }, 0)

const getSizes = (fs: FileSystem): number[] =>
  Object.entries(fs).reduce(
    (prev, [dir, value]) =>
      typeof value !== 'number' ? [...prev, ...getSizes(value)] : prev,
    [getDirectorySize(fs)]
  )

export const part1 = (input: string) =>
  sum(getSizes(makeFS(input)['/'] as FileSystem).filter((size) => size <= 1e5))

export const part2 = (input: string) =>
  getSizes(makeFS(input)['/'] as FileSystem)
    .sort((a, b) => a - b)
    .find((size, _, arr) => size >= 3e7 - (7e7 - arr[arr.length - 1]))
