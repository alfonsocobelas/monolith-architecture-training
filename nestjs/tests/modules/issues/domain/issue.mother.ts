import { v7 as uuidv7 } from 'uuid'
import { IssueCreateProps, IssuePrimitiveProps, IssueProps } from 'src/modules/issues/domain/issue-types'
import { Issue } from 'src/modules/issues/domain/issue'
import { IssuePartCategory } from 'src/modules/issues/domain/issue-enums'
import { IssueBuilder } from './issue.builder'
import { repeat } from '../../shared/utils/random-array'

export class IssueMother {
  static fromInput(input: Partial<IssuePrimitiveProps>): Issue {
    return IssueBuilder.anIssue().withProps(input as Partial<IssueProps>).build()
  }

  static register(overrides?: Partial<IssueCreateProps>): Issue {
    return IssueBuilder.anIssue().withProps(overrides).create()
  }

  static reconstruct(overrides?: Partial<IssueProps>): Issue {
    return IssueBuilder.anIssue().withProps(overrides).build()
  }

  static random() {
    return IssueBuilder.anIssue().build()
  }

  static randomList(count: number = 5): Issue[] {
    return repeat(() => this.random(), count)
  }

  static avionics(aircraftId: string = uuidv7()) {
    return IssueBuilder
      .anIssue()
      .withPartCategory(IssuePartCategory.AVIONICS)
      .withAircraftId(aircraftId)
      .build()
  }

  static engine(engineId: string = uuidv7()) {
    return IssueBuilder
      .anIssue()
      .withPartCategory(IssuePartCategory.ENGINE)
      .withEngineId(engineId)
      .build()
  }
}
