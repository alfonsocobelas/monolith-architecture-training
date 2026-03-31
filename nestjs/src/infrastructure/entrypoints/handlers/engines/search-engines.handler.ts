import { Injectable } from '@nestjs/common'
import { SearchEnginesResponse } from '../../dtos/engines/search-engines.response'
import { PaginateCursorDto } from '../../dtos/shared/paginate-cursor.dto'
import { SearchEnginesUseCase } from 'src/modules/engines/application/paginate/search-engines-usecase.service'

@Injectable()
export class SearchEnginesHandler {
  constructor(
    private readonly useCase: SearchEnginesUseCase
  ) {}

  async run(dto: PaginateCursorDto): Promise<SearchEnginesResponse> {
    return this.useCase.invoke(dto)
  }
}
