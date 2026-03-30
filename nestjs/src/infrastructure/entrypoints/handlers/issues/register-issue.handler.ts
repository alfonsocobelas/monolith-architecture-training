import { Injectable } from '@nestjs/common'
import { RegisterIssueInput } from 'src/modules/issues/application/create/register-issue-input.dto'
import { RegisterIssueUseCase } from 'src/modules/issues/application/create/register-issue-usecase.service'

@Injectable()
export class RegisterIssueHandler {
  constructor(
    private readonly useCase: RegisterIssueUseCase
  ) {}

  async run(input: RegisterIssueInput): Promise<void> {
    await this.useCase.invoke(input)
  }
}
