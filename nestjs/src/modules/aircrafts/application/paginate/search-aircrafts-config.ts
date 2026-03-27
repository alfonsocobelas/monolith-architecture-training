import { AircraftProps } from '../../domain/aircraft-types'

type AircraftAllowedFields = keyof AircraftProps | 'model.name' // aditional field of related entity, to test nested fields filtering

const AIRCRAFT_ALLOWED_FILTERS: Array<AircraftAllowedFields> = [
  'id',
  'modelId',
  'tailNumber',
  'totalFlightHours',
  'fuelLevelPercentage',
  'status',
  'model.name'
] as const

const AIRCRAFT_ALLOWED_ORDERS: Array<AircraftAllowedFields> = [
  'id',
  'modelId',
  'tailNumber',
  'totalFlightHours',
  'fuelLevelPercentage',
  'status',
  'model.name'
] as const

const searchAircraftsConfig = {
  allowedFilters: AIRCRAFT_ALLOWED_FILTERS,
  allowedOrders: AIRCRAFT_ALLOWED_ORDERS
} as const

export default searchAircraftsConfig
