import fs from 'fs'
import path from 'path'

export const readDayInput = (day: number) =>
  fs.readFileSync(path.join(__dirname, '../inputs/day' + day + '.txt'), 'utf-8')
