import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { GetEngineHandler } from '../handlers/engines/get-engine.handler'
import { SearchEnginesHandler } from '../handlers/engines/search-engines.handler'
import { RegisterEngineHandler } from '../handlers/engines/register-engine.handler'
import { IdParamDto } from '../dtos/shared/id-param.dto'
import { RegisterEngineDto } from '../dtos/engines/register-engine.dto'
import { PaginateCursorDto } from '../dtos/shared/paginate-cursor.dto'

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
  get(@Param('id') id: IdParamDto) {
    return this.getEngineHandler.run(id)
  }

  @Get()
  search(@Param() params: PaginateCursorDto) {
    return this.searchEnginesHandler.run(params)
  }
}
