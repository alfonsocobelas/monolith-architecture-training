import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { RegisterFleetHandler } from '../handlers/fleets/register-fleet.handler'
import { RegisterFleetDto } from '../dtos/fleets/register-fleet.dto'
import { IdParamDto } from '../dtos/shared/id-param.dto'
import { GetFleetHandler } from '../handlers/fleets/get-fleet.handler'
import { SearchFleetsHandler } from '../handlers/fleets/search-fleets.handler'
import { PaginateOffsetDto } from '../dtos/shared/paginate-offset.dto'

@Controller('fleets')
export class FleetsController {
  constructor(
      private readonly registerFleetHandler: RegisterFleetHandler,
      private readonly getFleetHandler: GetFleetHandler,
      private readonly searchFleetsHandler: SearchFleetsHandler
  ) {}

  @Post()
  register(@Body() body: RegisterFleetDto) {
    return this.registerFleetHandler.run(body)
  }

  @Get(':id')
  get(@Param('id') id: IdParamDto) {
    return this.getFleetHandler.run(id)
  }

  @Get()
  search(@Param() params: PaginateOffsetDto) {
    return this.searchFleetsHandler.run(params)
  }
}
