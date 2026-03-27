import { Nullable } from 'src/common/nullable'

export interface GetIssueOutput {
  id: string
  code: string
  description: string
  severity: string
  requiresGrounding: boolean
  partCategory: string
  aircraftId: Nullable<string>
  engineId: Nullable<string>
}
