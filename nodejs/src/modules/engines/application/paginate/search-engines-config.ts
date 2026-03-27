import { Engine } from '../../domain/engine'

type EngineAllowedFilters = keyof Engine

const ENGINE_ALLOWED_FILTERS: Array<EngineAllowedFilters> = [
  'id',
  'serialNumber',
  'healthScore',
  'flyingHoursAccumulated',
  'cyclesSinceLastOverhaul',
  'status'
] as const

const ENGINE_ALLOWED_ORDERS: Array<EngineAllowedFilters> = [
  'id',
  'serialNumber',
  'healthScore',
  'flyingHoursAccumulated',
  'cyclesSinceLastOverhaul',
  'status'
] as const

const searchEnginesConfig = {
  allowedFilters: ENGINE_ALLOWED_FILTERS,
  allowedOrders: ENGINE_ALLOWED_ORDERS
} as const

export default searchEnginesConfig
