import { describe, expect, it } from 'vitest'
import { readDayInput } from '../utils/io'

import * as day7 from '../days/day7'

describe('D7P1', () => {
  it('should solve example case', () => {
    const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

    expect(day7.part1(input)).toEqual(95_437)
  })
})

describe('D7P2', () => {
  it('should solve example case', () => {
    const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

    expect(day7.part2(input)).toEqual(24933642)
  })
})
