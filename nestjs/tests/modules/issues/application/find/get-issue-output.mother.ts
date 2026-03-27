import { GetIssueOutput } from 'src/modules/issues/application/find/get-issue-output.dto'
import { Issue } from 'src/modules/issues/domain/issue'

export class GetIssueOutputMother {
  static fromDomain(issue: Issue): GetIssueOutput {
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
