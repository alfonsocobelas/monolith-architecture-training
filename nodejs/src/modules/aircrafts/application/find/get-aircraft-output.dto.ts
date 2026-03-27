export interface GetAircraftOutput {
  id: string
  modelId: string
  tailNumber: string
  totalFlightHours: number
  fuelLevelPercentage: number
  status: string
  model?: {
    id: string
    name: string
    numEngines: number
  }
  engines?: Array<{
    id: string
    healthScore: number
  }>
}
