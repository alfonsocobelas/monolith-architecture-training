import { AircraftModelStatus } from './aircraft-model-enums'

type AircraftModelCreateKeys = 'id' | 'name' | 'code' | 'manufacturer' | 'passengerCapacity' | 'numEngines'
export type AircraftModelCreateProps = Pick<AircraftModelProps, AircraftModelCreateKeys>

export interface AircraftModelProps {
  id: string
  name: string
  code: string
  manufacturer: string
  passengerCapacity: number
  numEngines: number
  status: AircraftModelStatus
}

export interface AircraftModelPrimitiveProps {
  id: string
  name: string
  code: string
  manufacturer: string
  passengerCapacity: number
  numEngines: number
  status: string
}
