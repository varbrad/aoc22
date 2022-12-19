import { clone, cloneDeep } from 'lodash'
import { sum } from '../utils/array'
import { split } from '../utils/string'

const regex =
  /costs (\d+)(?:.*)costs (\d+)(?:.*)costs (\d+) ore and (\d+)(?:.*)costs (\d+) ore and (\d+)/
type Blueprint = ReturnType<typeof parse>[number]
const parse = (input: string) =>
  split(input).map((line) => {
    const result = regex.exec(line)!
    const vs = result.slice(1).map(Number)
    return {
      ore: vs[0],
      clay: vs[1],
      obsidian: {
        ore: vs[2],
        clay: vs[3],
      },
      geode: {
        ore: vs[4],
        obsidian: vs[5],
      },
      maxOreNeeded: Math.max(vs[1], vs[2], vs[4]),
      maxClayNeeded: vs[3],
      maxObsidianNeeded: vs[5],
    }
  })

type ItemState = { robots: number; total: number }
type State = {
  timeLeft: number
  ore: ItemState
  clay: ItemState
  obsidian: ItemState
  geode: ItemState
}

const tick = (state: State, ticks: number = 1) => {
  const newState = cloneDeep(state)
  newState.timeLeft -= ticks
  newState.ore.total += newState.ore.robots * ticks
  newState.clay.total += newState.clay.robots * ticks
  newState.obsidian.total += newState.obsidian.robots * ticks
  newState.geode.total += newState.geode.robots * ticks
  return newState
}

const getNextStates = (blueprint: Blueprint, state: State): State[] => {
  // First check, are we out of time?
  if (state.timeLeft <= 0) return []

  const nextStates: State[] = []

  // How long do we need to wait to create an ore robot?
  if (state.ore.robots < blueprint.maxOreNeeded) {
    const oresNeeded = blueprint.ore - state.ore.total
    const oreTime = Math.max(Math.ceil(oresNeeded / state.ore.robots), 0)
    if (state.timeLeft >= oreTime + 1) {
      const oreState = tick(state, oreTime)
      oreState.ore.robots++
      oreState.ore.total -= blueprint.ore
      oreState.ore.total--
      nextStates.push(tick(oreState))
    }
  }

  if (state.clay.robots < blueprint.maxClayNeeded) {
    const oresNeeded = blueprint.clay - state.ore.total
    const oreTime = Math.max(Math.ceil(oresNeeded / state.ore.robots), 0)
    if (state.timeLeft >= oreTime + 1) {
      const clayState = tick(state, oreTime)
      clayState.clay.robots++
      clayState.ore.total -= blueprint.clay
      clayState.clay.total--
      nextStates.push(tick(clayState))
    }
  }

  if (
    state.obsidian.robots < blueprint.maxObsidianNeeded &&
    state.clay.robots > 0
  ) {
    const oresNeeded = blueprint.obsidian.ore - state.ore.total
    const clayNeeded = blueprint.obsidian.clay - state.clay.total
    const timeNeeded = Math.max(
      Math.ceil(oresNeeded / state.ore.robots),
      Math.ceil(clayNeeded / state.clay.robots),
      0
    )
    if (state.timeLeft >= timeNeeded + 1) {
      const obsidianState = tick(state, timeNeeded)
      obsidianState.obsidian.robots++
      obsidianState.ore.total -= blueprint.obsidian.ore
      obsidianState.clay.total -= blueprint.obsidian.clay
      obsidianState.obsidian.total--
      nextStates.push(tick(obsidianState))
    }
  }

  if (state.obsidian.robots > 0) {
    const oresNeeded = blueprint.geode.ore - state.ore.total
    const obsidianNeeded = blueprint.geode.obsidian - state.obsidian.total
    const timeNeeded = Math.max(
      Math.ceil(oresNeeded / state.ore.robots),
      Math.ceil(obsidianNeeded / state.obsidian.robots),
      0
    )
    if (state.timeLeft >= timeNeeded + 1) {
      const geodeState = tick(state, timeNeeded)
      geodeState.geode.robots++
      geodeState.ore.total -= blueprint.geode.ore
      geodeState.obsidian.total -= blueprint.geode.obsidian
      geodeState.geode.total--
      nextStates.push(tick(geodeState))
    }
  }

  return nextStates.length === 0 ? [tick(state, state.timeLeft)] : nextStates
}

export const part1 = (input: string) => {
  const blueprints = parse(input)
  let sum = 0
  for (let i = 0; i < blueprints.length; ++i) {
    const blueprint = blueprints[i]
    const initialState: State = {
      ore: { robots: 1, total: 0 },
      clay: { robots: 0, total: 0 },
      obsidian: { robots: 0, total: 0 },
      geode: { robots: 0, total: 0 },
      timeLeft: 24,
    }
    let states = [initialState]
    let maxGeodes = -1
    for (let k = 0; k < 1_000_000; ++k) {
      const state = states.shift()
      if (!state) {
        break
      }
      const nextStates = getNextStates(blueprint, state)
      if (nextStates.length === 0) {
        maxGeodes = Math.max(maxGeodes, state.geode.total)
        states = states.filter(
          (state) =>
            state.geode.total + state.timeLeft * (state.geode.robots + 2) >=
            maxGeodes
        )
        continue
      }
      states.push(...nextStates)
      states.sort((a, b) => {
        return (
          Math.sign(b.geode.total - a.geode.total) ||
          Math.sign(b.geode.robots - a.geode.robots) ||
          Math.sign(b.obsidian.total - a.obsidian.total) ||
          Math.sign(b.obsidian.robots - a.obsidian.robots) ||
          Math.sign(b.clay.total - a.clay.total) ||
          Math.sign(b.clay.robots - a.clay.robots) ||
          Math.sign(b.ore.total - a.ore.total)
        )
      })
    }
    sum += (i + 1) * maxGeodes
  }
  return sum
}

export const part2 = (input: string) => {
  const blueprints = parse(input)
  let product = 1
  const loops = Math.min(3, blueprints.length)
  for (let i = 0; i < loops; ++i) {
    const blueprint = blueprints[i]
    const initialState: State = {
      ore: { robots: 1, total: 0 },
      clay: { robots: 0, total: 0 },
      obsidian: { robots: 0, total: 0 },
      geode: { robots: 0, total: 0 },
      timeLeft: 32,
    }
    let states = [initialState]
    let maxGeodes = -1
    for (let k = 0; k < 100_000_000; ++k) {
      const state = states.shift()
      if (!state) {
        break
      }
      const nextStates = getNextStates(blueprint, state)
      if (nextStates.length === 0) {
        maxGeodes = Math.max(maxGeodes, state.geode.total)
        states = states.filter(
          (state) =>
            state.geode.total + state.timeLeft * (state.geode.robots + 6) >=
            maxGeodes
        )
        continue
      }
      states.push(...nextStates)
      states.sort((a, b) => {
        return (
          Math.sign(b.geode.total - a.geode.total) ||
          Math.sign(b.geode.robots - a.geode.robots) ||
          Math.sign(b.obsidian.total - a.obsidian.total) ||
          Math.sign(b.obsidian.robots - a.obsidian.robots) ||
          Math.sign(b.clay.total - a.clay.total) ||
          Math.sign(b.clay.robots - a.clay.robots) ||
          Math.sign(b.ore.total - a.ore.total)
        )
      })
    }
    product *= maxGeodes
  }
  return product
}
