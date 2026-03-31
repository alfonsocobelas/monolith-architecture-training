import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { RegisterFleetHandler } from '../handlers/fleets/register-fleet.handler'
import { RegisterFleetDto } from '../dtos/fleets/register-fleet.dto'
import { GetFleetHandler } from '../handlers/fleets/get-fleet.handler'
import { SearchFleetsHandler } from '../handlers/fleets/search-fleets.handler'
import { PaginateOffsetDto } from '../dtos/shared/paginate-offset.dto'
import { ParseUUIDv7Pipe } from '../pipes/parse-uuid-v7.pipe'
import { ParseCriteriaPipe } from '../pipes/parse-criteria.pipe'

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
  get(@Param('id', ParseUUIDv7Pipe) id: string) {
    return this.getFleetHandler.run(id)
  }

  @Get()
  search(@Query(new ParseCriteriaPipe()) query: PaginateOffsetDto) {
    return this.searchFleetsHandler.run(query)
  }
}
