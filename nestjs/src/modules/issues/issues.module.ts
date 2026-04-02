import { Module } from '@nestjs/common'
import { IssuesController } from 'src/infrastructure/entrypoints/controllers/issues.controller'
import { GetIssueUseCase } from 'src/modules/issues/application/find/get-issue-usecase.service'
import { SearchIssuesUseCase } from 'src/modules/issues/application/paginate/search-issues-usecase.service'
import { RegisterIssueUseCase } from 'src/modules/issues/application/create/register-issue-usecase.service'
import { IssueRepository } from 'src/modules/issues/domain/issue.repository'
import { TypeOrmIssueRepository } from 'src/modules/issues/infrastructure/typeorm/typeorm-issue.repository'
import { GetIssueHandler } from 'src/infrastructure/entrypoints/handlers/issues/get-issue.handler'
import { SearchIssuesHandler } from 'src/infrastructure/entrypoints/handlers/issues/search-issues.handler'
import { RegisterIssueHandler } from 'src/infrastructure/entrypoints/handlers/issues/register-issue.handler'

@Module({
  controllers: [IssuesController],
  providers: [
    // Handlers
    RegisterIssueHandler,
    GetIssueHandler,
    SearchIssuesHandler,
    // Use Cases
    RegisterIssueUseCase,
    GetIssueUseCase,
    SearchIssuesUseCase,
    // Repositories
    {
      provide: IssueRepository,
      useClass: TypeOrmIssueRepository
    }
  ],
  exports: [IssueRepository]
})
export class IssuesModule {}
