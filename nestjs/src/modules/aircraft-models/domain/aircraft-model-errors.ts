import { BusinessRuleViolationError } from 'src/common/errors'

export class AircraftModelError extends BusinessRuleViolationError {
  constructor(message: string, cause?: unknown) {
    super(message, 'AircraftModel', cause)
  }
}
