import { isValidUuidV7 } from 'src/modules/shared/domain/validators/validateId'
import { normalizeString } from 'src/modules/shared/utils/normalize'
import { IssuePartCategory, IssueSeverityLevel } from './issue-enums'
import { IssueError } from './issue-errors'
import { IssueCreateProps, IssueProps } from './issue-types'
import { ISSUE_CONSTRAINTS as LIMITS } from './issue-constants'

export class Issue {
  readonly id: string
  readonly code: string
  readonly description: string
  readonly severity: IssueSeverityLevel
  readonly requiresGrounding: boolean
  readonly partCategory: IssuePartCategory
  readonly aircraftId?: string
  readonly engineId?: string

  private constructor(props: IssueProps) {
    this.id = props.id
    this.code = props.code
    this.description = props.description
    this.severity = props.severity
    this.requiresGrounding = props.requiresGrounding
    this.partCategory = props.partCategory
    this.aircraftId = props.aircraftId
    this.engineId = props.engineId
  }

  static create(props: IssueCreateProps): Issue {
    const code = normalizeString(props.code)

    if (props.aircraftId) {
      this.validateAircraftId(props.aircraftId)
    }

    if (props.engineId) {
      this.validateEngineId(props.engineId)
    }

    this.validateId(props.id)
    this.validateCode(code)
    this.validateDescription(props.description)
    this.validateSeverity(props.severity)
    this.validateCategory(props.partCategory, props.aircraftId, props.engineId)

    return new Issue({ ...props, code })
  }

  static reconstruct(props: IssueProps): Issue {
    return new Issue(props)
  }

  private static validateId(id: string): void {
    if (!isValidUuidV7(id)) {
      throw new IssueError('Invalid id')
    }
  }

  private static validateEngineId(engineId: string): void {
    if (!isValidUuidV7(engineId)) {
      throw new IssueError('Invalid engineId')
    }
  }

  private static validateAircraftId(aircraftId: string): void {
    if (!isValidUuidV7(aircraftId)) {
      throw new IssueError('Invalid aircraftId')
    }
  }

  private static validateCode(normalized: string): void {
    if (!normalized || !normalized.length) {
      throw new IssueError('Code cannot be empty')
    }

    if (normalized.length < LIMITS.CODE.MIN_LENGTH) {
      throw new IssueError(`Code must be at least ${LIMITS.CODE.MIN_LENGTH} characters`)
    }

    if (normalized.length > LIMITS.CODE.MAX_LENGTH) {
      throw new IssueError(`Code must be less than or equal to ${LIMITS.CODE.MAX_LENGTH} characters`)
    }
  }

  private static validateDescription(description: string): void {
    if (!description || !description.trim().length) {
      throw new IssueError('Description cannot be empty')
    }

    if (description.length < LIMITS.DESCRIPTION.MIN_LENGTH) {
      throw new IssueError(`Description must be at least ${LIMITS.DESCRIPTION.MIN_LENGTH} characters`)
    }

    if (description.length > LIMITS.DESCRIPTION.MAX_LENGTH) {
      throw new IssueError(`Description must be less than or equal to ${LIMITS.DESCRIPTION.MAX_LENGTH} characters`)
    }
  }

  private static validateSeverity(severity: IssueSeverityLevel): void {
    if (!(severity in IssueSeverityLevel)) {
      throw new IssueError(`Invalid severity level: ${severity}`)
    }
  }

  private static validateCategory(partCategory: IssuePartCategory, aircraftId?: string, engineId?: string): void {
    if ((partCategory === IssuePartCategory.AVIONICS || partCategory === IssuePartCategory.FUSELAGE) && !aircraftId) {
      throw new IssueError('aircraftId is required when partCategory is Aircraft')
    }

    if (partCategory === IssuePartCategory.ENGINE && !engineId) {
      throw new IssueError('engineId is required when partCategory is ENGINE')
    }
  }
}
