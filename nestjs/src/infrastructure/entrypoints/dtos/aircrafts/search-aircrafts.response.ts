export class SearchAircraftsResponse {
  total!: number
  page!: number
  pageSize!: number
  totalPages!: number
  items!: {
    id: string
    modelId: string
    tailNumber: string
    totalFlightHours: number
    fuelLevelPercentage: number
    status: string
  }[]
}
