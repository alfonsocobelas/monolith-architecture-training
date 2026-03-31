import { Injectable } from '@nestjs/common'
import { AlreadyExistsError } from 'src/common/errors'
import { RegisterIssueInput } from './register-issue-input.dto'
import { Issue } from '../../domain/issue'
import { IssueRepository } from '../../domain/issue.repository'
import { IssueWithCodeSpecification } from '../../domain/specifications/issue-with-code.specification'
import { IssuePartCategory, IssueSeverityLevel } from '../../domain/issue-enums'

@Injectable()
export class RegisterIssueUseCase {
  constructor(
    private readonly repository: IssueRepository
  ) {}

  async invoke(input: RegisterIssueInput): Promise<void> {
    const issueExists = await this.repository.exists(new IssueWithCodeSpecification(input.code))

    if (issueExists) {
      throw new AlreadyExistsError('Issue', 'code', input.code)
    }

    const issue = Issue.create({
      id: input.id,
      code: input.code,
      description: input.description,
      severity: input.severity as IssueSeverityLevel,
      requiresGrounding: input.requiresGrounding,
      partCategory: input.partCategory as IssuePartCategory,
      aircraftId: input.aircraftId,
      engineId: input.engineId
    })

    await this.repository.register(issue)
  }
}
