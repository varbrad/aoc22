import { readDayInput } from './utils/io'
import chalk from 'chalk'

const init = async (day: number, part: number | 'both') => {
  const module = await import('./days/day' + day)
  const input = readDayInput(day)

  const p1t0 = performance.now()
  const p1 =
    (part === 1 || part === 'both') && module.part1 ? module.part1(input) : '-'
  const p1t1 = performance.now() - p1t0
  const p2t0 = performance.now()
  const p2 =
    (part === 2 || part === 'both') && module.part2 ? module.part2(input) : '-'
  const p2t1 = performance.now() - p2t0

  if (part === 1 || part === 'both') {
    console.log(
      chalk.magenta(`Day ${day}`),
      chalk.cyan('Part 1'),
      chalk.gray('(' + p1t1.toFixed(1) + 'ms)'),
      '\n' + chalk.yellow(p1)
    )
  }
  if (part === 2 || part === 'both') {
    console.log(
      chalk.magenta(`Day ${day}`),
      chalk.cyan('Part 2'),
      chalk.gray('(' + p2t1.toFixed(1) + 'ms)'),
      '\n' + chalk.yellow(p2)
    )
  }
}

const day = Number(process.argv[2])
const part = process.argv[3] ? Number(process.argv[3]) : 'both'
if (Number.isNaN(day)) throw new Error('Day was not specified')
init(day, part)
