export const AIRCRAFT_CONSTRAINTS = {
  TAIL_NUMBER: { MIN_LENGTH: 5, MAX_LENGTH: 20 },
  FLIGHT_HOURS: { MIN: 0, MAX: 100000 },
  FUEL_LEVEL: { MIN: 0, MAX: 100 }
} as const

export const AIRCRAFT_DEFAULTS = {
  INITIAL_ENGINE_IDS: [] as string[]
} as const
