import { v7 as uuidv7 } from 'uuid'
import { RegisterIssueInput } from 'src/modules/issues/application/create/register-issue-input.dto'
import { IssuePartCategory, IssueSeverityLevel } from 'src/modules/issues/domain/issue-enums'
import { ISSUE_CONSTRAINTS as LIMITS } from 'src/modules/issues/domain/issue-constants'
import { randomString } from '../../../shared/utils/random-string'
import { randomBoolean } from '../../../shared/utils/random-boolean'
import { randomEnumValue } from '../../../shared/utils/random-enum'

export class RegisterIssueInputMother {
  static create(overrides?: Partial<RegisterIssueInput>): RegisterIssueInput {
    return {
      id: uuidv7(),
      code: randomString(LIMITS.CODE.MIN_LENGTH, LIMITS.CODE.MAX_LENGTH),
      description: randomString(LIMITS.DESCRIPTION.MIN_LENGTH, LIMITS.DESCRIPTION.MAX_LENGTH),
      severity: randomEnumValue(IssueSeverityLevel).toString(),
      partCategory: randomEnumValue(IssuePartCategory).toString(),
      requiresGrounding: randomBoolean(),
      ...overrides
    }
  }

  static random(): RegisterIssueInput {
    return this.create()
  }

  static engine(engineId: string): RegisterIssueInput {
    return this.create({ engineId, partCategory: IssuePartCategory.ENGINE })
  }

  static avionics(aircraftId: string): RegisterIssueInput {
    return this.create({ aircraftId, partCategory: IssuePartCategory.AVIONICS })
  }
}
