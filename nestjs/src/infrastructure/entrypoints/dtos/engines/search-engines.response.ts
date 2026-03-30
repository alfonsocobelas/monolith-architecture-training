import { Nullable } from 'src/common/nullable'

export class SearchEnginesResponse {
  hasMore!: boolean
  nextCursor!: Nullable<string>
  items!: {
    id: string
    serialNumber: string
    healthScore: number
    flyingHoursAccumulated: number
    cyclesSinceLastOverhaul: number
    status: string
  }[]
}
