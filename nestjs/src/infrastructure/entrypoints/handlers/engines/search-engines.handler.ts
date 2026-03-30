import { Injectable } from '@nestjs/common'
import { SearchEnginesUseCase } from 'src/modules/engines/application/paginate/search-engines-usecase.service'
import { SearchEnginesResponse } from '../../dtos/engines/search-engines.response'
import { PaginateCursorDto } from '../../dtos/shared/paginate-cursor.dto'

const DEFAULT_PAGE_SIZE = 10

@Injectable()
export class SearchEnginesHandler {
  constructor(
    private readonly useCase: SearchEnginesUseCase
  ) {}

  async run(dto: PaginateCursorDto): Promise<SearchEnginesResponse> {
    const input = {
      ...dto,
      cursor: dto.cursor ? String(dto.cursor) : undefined,
      pageSize: dto.pageSize ? Number(dto.pageSize) : DEFAULT_PAGE_SIZE
    }

    return this.useCase.invoke(input)
  }
}
