import { Injectable } from '@nestjs/common'
import { SearchIssuesUseCase } from 'src/modules/issues/application/paginate/search-issues-usecase.service'
import { PaginateCursorDto } from '../../dtos/shared/paginate-cursor.dto'
import { SearchIssuesResponse } from '../../dtos/issues/search-issues.response'

@Injectable()
export class SearchIssuesHandler {
  constructor(
    private readonly useCase: SearchIssuesUseCase
  ) {}

  async run(dto: PaginateCursorDto): Promise<SearchIssuesResponse> {
    return this.useCase.invoke(dto)
  }
}
