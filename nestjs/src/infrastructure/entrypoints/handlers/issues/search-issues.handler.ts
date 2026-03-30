import { Injectable } from '@nestjs/common'
import { SearchIssuesUseCase } from 'src/modules/issues/application/paginate/search-issues-usecase.service'
import { PaginateCursorDto } from '../../dtos/shared/paginate-cursor.dto'
import { SearchIssuesResponse } from '../../dtos/issues/search-issues.response'

const DEFAULT_PAGE_SIZE = 10

@Injectable()
export class SearchIssuesHandler {
  constructor(
    private readonly useCase: SearchIssuesUseCase
  ) {}

  async run(dto: PaginateCursorDto): Promise<SearchIssuesResponse> {
    const input = {
      ...dto,
      cursor: dto.cursor ? String(dto.cursor) : undefined,
      pageSize: dto.pageSize ? Number(dto.pageSize) : DEFAULT_PAGE_SIZE
    }

    return this.useCase.invoke(input)
  }
}
