import { Injectable } from '@nestjs/common'
import { SearchFleetsUseCase } from 'src/modules/fleets/application/paginate/search-fleets-usecase.service'
import { SearchFleetsResponse } from '../../dtos/fleets/search-fleets.response'
import { PaginateOffsetDto } from '../../dtos/shared/paginate-offset.dto'

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 10

@Injectable()
export class SearchFleetsHandler {
  constructor(
    private readonly useCase: SearchFleetsUseCase
  ) {}

  async run(dto: PaginateOffsetDto): Promise<SearchFleetsResponse> {
    const input = {
      ...dto,
      page: dto.page ? Number(dto.page) : DEFAULT_PAGE,
      pageSize: dto.pageSize ? Number(dto.pageSize) : DEFAULT_PAGE_SIZE
    }

    return this.useCase.invoke(input)
  }
}
