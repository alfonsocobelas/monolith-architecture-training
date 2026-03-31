import { Injectable } from '@nestjs/common'
import { GetIssueUseCase } from 'src/modules/issues/application/find/get-issue-usecase.service'
import { GetIssueResponse } from '../../dtos/issues/get-issue.response'

@Injectable()
export class GetIssueHandler {
  constructor(
    private readonly useCase: GetIssueUseCase
  ) {}

  async run(id: string): Promise<GetIssueResponse> {
    return this.useCase.invoke({ id })
  }
}
