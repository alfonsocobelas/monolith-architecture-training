import { EngineStatus } from './engine-enums'

export type EngineCreateProps = Pick<EngineProps, 'id' | 'serialNumber'>

export interface EngineProps {
  id: string
  serialNumber: string
  healthScore: number
  flyingHoursAccumulated: number
  cyclesSinceLastOverhaul: number
  status: EngineStatus
  isInstalled: boolean
  aircraftId?: string
}

export interface EnginePrimitiveProps {
  id: string
  serialNumber: string
  healthScore: number
  flyingHoursAccumulated: number
  cyclesSinceLastOverhaul: number
  status: string
  isInstalled: boolean
  aircraftId?: string
}
