import { BusinessRuleViolationError } from 'src/common/errors'

export class FleetError extends BusinessRuleViolationError {
  constructor(message: string, cause?: unknown) {
    super(message, 'Fleet', cause)
  }
}
