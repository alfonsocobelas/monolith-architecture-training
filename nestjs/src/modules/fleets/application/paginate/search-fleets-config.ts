import { FleetProps } from '../../domain/fleet-types'

type FleetAllowedFields = keyof FleetProps

const FLEET_ALLOWED_FILTERS: Array<FleetAllowedFields> = [
  'id',
  'name',
  'companyId',
  'type',
  'operationRegion',
  'maintenanceBudget',
  'status'
] as const

const FLEET_ALLOWED_ORDERS: Array<FleetAllowedFields> = [
  'id',
  'name',
  'companyId',
  'type',
  'operationRegion',
  'maintenanceBudget',
  'status'
] as const

const searchFleetsConfig = {
  allowedFilters: FLEET_ALLOWED_FILTERS,
  allowedOrders: FLEET_ALLOWED_ORDERS
} as const

export default searchFleetsConfig
