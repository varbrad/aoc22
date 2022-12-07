import { set } from 'lodash'
import { sortAsc, sum } from '../utils/array'
import { isNum } from '../utils/guards'
import { split } from '../utils/string'

interface FileSystem {
  [key: string]: FileSystem | number
}

const makeFS = (input: string): FileSystem => {
  const fs: FileSystem = {}
  let path = ['/']
  split(input).forEach((line) => {
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
    return prev + (isNum(value) ? value : getDirectorySize(value))
  }, 0)

const getSizes = (fs: FileSystem): number[] =>
  Object.values(fs).reduce(
    (prev, value) => (!isNum(value) ? prev.concat(getSizes(value)) : prev),
    [getDirectorySize(fs)]
  )

export const part1 = (input: string) =>
  sum(getSizes(makeFS(input)['/'] as FileSystem).filter((size) => size <= 1e5))

export const part2 = (input: string) =>
  sortAsc(getSizes(makeFS(input)['/'] as FileSystem)).find(
    (size, _, arr) => size >= 3e7 - (7e7 - arr[arr.length - 1])
  )
