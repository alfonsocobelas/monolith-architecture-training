import { Injectable } from '@nestjs/common'
import { SearchAircraftsUseCase } from 'src/modules/aircrafts/application/paginate/search-aircrafts-usecase.service'
import { PaginateOffsetDto } from '../../dtos/shared/paginate-offset.dto'
import { SearchAircraftsResponse } from '../../dtos/aircrafts/search-aircrafts.response'

@Injectable()
export class SearchAircraftsHandler {
  constructor(
    private readonly useCase: SearchAircraftsUseCase
  ) {}

  async run(dto: PaginateOffsetDto): Promise<SearchAircraftsResponse> {
    return this.useCase.invoke(dto)
  }
}
