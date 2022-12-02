import { readDayInput } from './utils/io'
import chalk from 'chalk'

const init = async (day: number) => {
  const module = await import('./days/day' + day)
  const input = readDayInput(day)

  const p1t0 = performance.now()
  const p1 = module.part1 ? module.part1(input) : '-'
  const p1t1 = performance.now() - p1t0
  const p2t0 = performance.now()
  const p2 = module.part2 ? module.part2(input) : '-'
  const p2t1 = performance.now() - p2t0

  console.log(
    chalk.magenta(`Day ${day}`),
    chalk.cyan('Part 1'),
    chalk.gray('(' + p1t1.toFixed(1) + 'ms)'),
    '\n' + chalk.yellow(p1)
  )
  console.log(
    chalk.magenta(`Day ${day}`),
    chalk.cyan('Part 2'),
    chalk.gray('(' + p2t1.toFixed(1) + 'ms)'),
    '\n' + chalk.yellow(p2)
  )
}

const day = Number(process.argv[2])
if (Number.isNaN(day)) throw new Error('Day was not specified')
init(day)
