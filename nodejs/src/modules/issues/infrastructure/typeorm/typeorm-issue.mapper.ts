import { IssueEntity } from './typeorm-issue.entity'
import { Issue } from '../../domain/issue'

export const IssueMapper = {
  toDomain(entity: IssueEntity): Issue {
    return Issue.reconstruct({
      id: entity.id,
      code: entity.code,
      description: entity.description,
      severity: entity.severity,
      requiresGrounding: entity.requiresGrounding,
      partCategory: entity.partCategory,
      aircraftId: entity.aircraftId ?? undefined,
      engineId: entity.engineId ?? undefined
    })
  },

  toPersistence(domain: Issue): IssueEntity {
    const entity = new IssueEntity()
    entity.id = domain.id
    entity.code = domain.code
    entity.description = domain.description
    entity.severity = domain.severity
    entity.requiresGrounding = domain.requiresGrounding
    entity.partCategory = domain.partCategory
    entity.aircraftId = domain.aircraftId ?? null
    entity.engineId = domain.engineId ?? null

    return entity
  }
}
