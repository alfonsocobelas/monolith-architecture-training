export class SearchFleetsResponse {
  total!: number
  page!: number
  pageSize!: number
  totalPages!: number
  items!: {
    id: string
    name: string
    companyId: string
    type: string
    operationRegion: string
    maintenanceBudget: number
    status: string
  }[]
}
