import { Injectable } from '@nestjs/common'
import { SearchFleetsResponse } from '../../dtos/fleets/search-fleets.response'
import { PaginateOffsetDto } from '../../dtos/shared/paginate-offset.dto'
import { SearchFleetsUseCase } from 'src/modules/fleets/application/paginate/search-fleets-usecase.service'

@Injectable()
export class SearchFleetsHandler {
  constructor(
    private readonly useCase: SearchFleetsUseCase
  ) {}

  async run(dto: PaginateOffsetDto): Promise<SearchFleetsResponse> {
    return this.useCase.invoke(dto)
  }
}
