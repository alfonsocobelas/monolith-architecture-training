import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { GetEngineHandler } from '../handlers/engines/get-engine.handler'
import { SearchEnginesHandler } from '../handlers/engines/search-engines.handler'
import { RegisterEngineHandler } from '../handlers/engines/register-engine.handler'
import { RegisterEngineDto } from '../dtos/engines/register-engine.dto'
import { PaginateCursorDto } from '../dtos/shared/paginate-cursor.dto'
import { ParseUUIDv7Pipe } from '../pipes/parse-uuid-v7.pipe'
import { ParseCriteriaPipe } from '../pipes/parse-criteria.pipe'

@Controller('engines')
export class EnginesController {
  constructor(
    private readonly registerEngineHandler: RegisterEngineHandler,
    private readonly getEngineHandler: GetEngineHandler,
    private readonly searchEnginesHandler: SearchEnginesHandler
  ) {}

  @Post()
  register(@Body() body: RegisterEngineDto) {
    return this.registerEngineHandler.run(body)
  }

  @Get(':id')
  get(@Param('id', ParseUUIDv7Pipe) id: string) {
    return this.getEngineHandler.run(id)
  }

  @Get()
  search(@Query(new ParseCriteriaPipe()) query: PaginateCursorDto) {
    return this.searchEnginesHandler.run(query)
  }
}
