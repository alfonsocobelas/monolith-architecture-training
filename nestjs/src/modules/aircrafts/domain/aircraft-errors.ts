import { BusinessRuleViolationError } from 'src/common/errors'

export class AircraftError extends BusinessRuleViolationError {
  constructor(message: string, cause?: unknown) {
    super(message, 'Aircraft', cause)
  }
}
