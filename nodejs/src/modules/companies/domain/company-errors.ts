import { BusinessRuleViolationError } from 'src/common/errors'

export class CompanyError extends BusinessRuleViolationError {
  constructor(message: string, cause?: unknown) {
    super(message, 'Company', cause)
  }
}
