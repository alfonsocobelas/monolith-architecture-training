export class GetEngineResponse {
  id!: string
  healthScore!: number
  serialNumber!: string
  flyingHoursAccumulated!: number
  cyclesSinceLastOverhaul!: number
  isInstalled!: boolean
  status!: string
  aircraftId!: string | null
}
