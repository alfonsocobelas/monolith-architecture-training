import { BusinessRuleViolationError } from 'src/common/errors'

export class EngineError extends BusinessRuleViolationError {
  constructor(message: string, cause?: unknown) {
    super(message, 'Engine', cause)
  }
}
