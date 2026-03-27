import { v7 as uuidv7 } from 'uuid'
import { Issue } from 'src/modules/issues/domain/issue'
import { IssueProps } from 'src/modules/issues/domain/issue-types'
import { IssuePartCategory, IssueSeverityLevel } from 'src/modules/issues/domain/issue-enums'
import { ISSUE_CONSTRAINTS as LIMITS } from 'src/modules/issues/domain/issue-constants'
import { randomEnumValue } from '../../shared/utils/random-enum'
import { randomString } from '../../shared/utils/random-string'
import { randomBoolean } from '../../shared/utils/random-boolean'

/**
 * IMPORTANT: In integration tests, be careful with fields that have uniqueness constraints.
 * You must set them manually to avoid collisions with other objects created in the database
 * during test execution.
 */
export class IssueBuilder {
  private props: IssueProps = {
    id: uuidv7(),
    code: randomString(LIMITS.CODE.MIN_LENGTH, LIMITS.CODE.MAX_LENGTH).trim().toUpperCase(),
    description: randomString(LIMITS.DESCRIPTION.MIN_LENGTH, LIMITS.DESCRIPTION.MAX_LENGTH),
    severity: randomEnumValue(IssueSeverityLevel),
    partCategory: randomEnumValue(IssuePartCategory),
    requiresGrounding: randomBoolean()
  }

  static anIssue(): IssueBuilder {
    return new IssueBuilder()
  }

  withId(id: string): IssueBuilder {
    this.props.id = id
    return this
  }

  withCode(code: string): IssueBuilder {
    this.props.code = code
    return this
  }

  withDescription(description: string): IssueBuilder {
    this.props.description = description
    return this
  }

  withSeverity(severity: IssueSeverityLevel): IssueBuilder {
    this.props.severity = severity
    return this
  }

  withRequiresGrounding(requiresGrounding: boolean): IssueBuilder {
    this.props.requiresGrounding = requiresGrounding
    return this
  }

  withPartCategory(partCategory: IssuePartCategory): IssueBuilder {
    this.props.partCategory = partCategory
    return this
  }

  withAircraftId(aircraftId: string): IssueBuilder {
    this.props.aircraftId = aircraftId
    return this
  }

  withEngineId(engineId: string): IssueBuilder {
    this.props.engineId = engineId
    return this
  }

  withProps(overrides?: Partial<IssueProps>): IssueBuilder {
    this.props = { ...this.props, ...overrides }
    return this
  }

  create(): Issue {
    return Issue.create({
      id: this.props.id,
      code: this.props.code,
      description: this.props.description,
      severity: this.props.severity,
      requiresGrounding: this.props.requiresGrounding,
      partCategory: this.props.partCategory,
      aircraftId: this.props.aircraftId,
      engineId: this.props.engineId
    })
  }

  build(): Issue {
    return Issue.reconstruct(this.props)
  }
}
