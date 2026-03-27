import { Issue } from '../../domain/issue'

type IssueAllowedFields = keyof Issue

const ISSUE_ALLOWED_FILTERS: Array<IssueAllowedFields> = [
  'id',
  'code',
  'description',
  'severity',
  'code',
  'partCategory'
] as const

const ISSUE_ALLOWED_ORDERS: Array<IssueAllowedFields> = [
  'id',
  'code',
  'description',
  'severity',
  'code',
  'partCategory'
] as const

const searchIssuesConfig = {
  allowedFilters: ISSUE_ALLOWED_FILTERS,
  allowedOrders: ISSUE_ALLOWED_ORDERS
} as const

export default searchIssuesConfig
