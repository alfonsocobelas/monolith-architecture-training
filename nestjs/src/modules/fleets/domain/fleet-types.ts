import { FleetStatus, FleetType, OperationRegion } from './fleet-enums'

export type FleetCreateProps = Omit<FleetProps, 'status' | 'createdAt' | 'updatedAt' | 'deletedAt'>

export interface FleetProps {
  id: string
  aircraftIds: string[]
  companyId: string
  name: string
  type: FleetType
  operationRegion: OperationRegion
  maintenanceBudget: number
  status: FleetStatus
}

export interface FleetPrimitiveProps {
  id: string
  aircraftIds: string[]
  companyId: string
  name: string
  type: string
  operationRegion: string
  maintenanceBudget: number
  status: string
}
