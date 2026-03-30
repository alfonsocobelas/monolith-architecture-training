import { Injectable } from '@nestjs/common'
import { SearchAircraftsUseCase } from 'src/modules/aircrafts/application/paginate/search-aircrafts-usecase.service'
import { PaginateOffsetDto } from '../../dtos/shared/paginate-offset.dto'
import { SearchAircraftsResponse } from '../../dtos/aircrafts/search-aircrafts.response'

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 10

@Injectable()
export class SearchAircraftsHandler {
  constructor(
    private readonly useCase: SearchAircraftsUseCase
  ) {}

  async run(dto: PaginateOffsetDto): Promise<SearchAircraftsResponse> {
    const input = {
      ...dto,
      page: dto.page ? Number(dto.page) : DEFAULT_PAGE,
      pageSize: dto.pageSize ? Number(dto.pageSize) : DEFAULT_PAGE_SIZE
    }

    return this.useCase.invoke(input)
  }
}
