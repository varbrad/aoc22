export const part1 = (input: string) =>
  input
    .trim()
    .indexOf(
      input.trim().match(/(.)((?!\1).)((?!\1|\2).)((?!\1|\2|\3).)/)![0]
    ) + 4

export const part2 = (input: string) => {
  let rgx = '(.)'
  for (let i = 0; i < 13; i++) {
    const a = Array.from({ length: i + 1 }, (_, ix) => '\\' + (ix + 1)).join(
      '|'
    )
    rgx += `((?!${a}).)`
  }
  const regex = new RegExp(rgx)
  return input.trim().indexOf(input.trim().match(regex)![0]) + 14
}
