import { BusinessRuleViolationError } from 'src/common/errors'

export class IssueError extends BusinessRuleViolationError {
  constructor(message: string, cause?: unknown) {
    super(message, 'Issue', cause)
  }
}
