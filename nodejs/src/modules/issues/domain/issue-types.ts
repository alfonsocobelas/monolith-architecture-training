import { IssuePartCategory, IssueSeverityLevel } from './issue-enums'

export type IssueCreateProps = Omit<IssueProps, 'createdAt' | 'updatedAt' | 'deletedAt'>

export interface IssueProps {
  id: string
  engineId?: string
  aircraftId?: string
  code: string
  description: string
  severity: IssueSeverityLevel
  requiresGrounding: boolean
  partCategory: IssuePartCategory
}

export interface IssuePrimitiveProps {
  id: string
  engineId?: string
  aircraftId?: string
  code: string
  description: string
  severity: string
  requiresGrounding: boolean
  partCategory: string
}
