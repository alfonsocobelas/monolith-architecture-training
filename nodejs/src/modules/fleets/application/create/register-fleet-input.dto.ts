export interface RegisterFleetInput {
  id: string
  aircraftIds: string[]
  companyId: string
  name: string
  operationRegion: string
  type: string
  maintenanceBudget: number
}
