export interface SearchIssuesOutput {
  id: string
  code: string
  description: string
  severity: string
  requiresGrounding: boolean
  partCategory: string
  aircraftId?: string
  engineId?: string
}
