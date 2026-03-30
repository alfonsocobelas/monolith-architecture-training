import { Nullable } from 'src/common/nullable'

export class SearchIssuesResponse {
  hasMore!: boolean
  nextCursor!: Nullable<string>
  items!: {
    id: string
    code: string
    description: string
    severity: string
    requiresGrounding: boolean
    partCategory: string
    aircraftId?: string
    engineId?: string
  }[]
}
