import { EntityNotFoundError } from 'src/common/errors'
import { GetIssueInput } from './get-issue-input.dto'
import { GetIssueOutput } from './get-issue-output.dto'
import { IssueRepository } from '../../domain/issue.repository'

export class GetIssueUseCase {
  constructor(
    private readonly issueRepository: IssueRepository
  ) {}

  async invoke(input: GetIssueInput): Promise<GetIssueOutput> {
    const issue = await this.issueRepository.get(input.id)

    if (!issue) {
      throw new EntityNotFoundError('Issue', input.id)
    }

    return {
      id: issue.id,
      code: issue.code,
      description: issue.description,
      severity: issue.severity,
      requiresGrounding: issue.requiresGrounding,
      partCategory: issue.partCategory,
      aircraftId: issue.aircraftId ?? null,
      engineId: issue.engineId ?? null
    }
  }
}
