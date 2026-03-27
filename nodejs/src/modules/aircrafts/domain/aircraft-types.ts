import { EngineProps } from 'src/modules/engines/domain/engine-types'
import { AircraftModelProps } from 'src/modules/aircraft-models/domain/aircraft-model-types'
import { AircraftStatus } from './aircraft-enums'

type AircraftModelRequirement = Pick<AircraftModelProps, 'id' | 'name' | 'numEngines'>
type AircraftEngineRequirement = Pick<EngineProps, 'id' | 'healthScore'>
export type AircraftCreateProps = Pick<AircraftProps, 'id' | 'modelId' | 'tailNumber'>

export interface AircraftProps {
  id: string
  fleetId?: string
  modelId: string
  engineIds: string[]
  tailNumber: string
  totalFlightHours: number
  fuelLevelPercentage: number
  isActive: boolean
  status: AircraftStatus
}

export interface AircraftPrimitiveProps {
  id: string
  fleetId?: string
  modelId: string
  engineIds: string[]
  tailNumber: string
  totalFlightHours: number
  fuelLevelPercentage: number
  isActive: boolean
  status: string
}

export interface AircraftReadModel extends AircraftProps {
  model: AircraftModelRequirement
  engines: AircraftEngineRequirement[]
}
