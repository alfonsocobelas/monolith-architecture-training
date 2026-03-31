import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { ParseUUIDv7Pipe } from 'src/infrastructure/entrypoints/pipes/parse-uuid-v7.pipe'
import { RegisterAircraftModelHandler } from '../handlers/aircraft-models/register-aircraft-model.handler'
import { ListAircraftModelCatalogueHandler } from '../handlers/aircraft-models/list-aircraft-model-catalogue.handler'
import { RemoveAircraftModelHandler } from '../handlers/aircraft-models/remove-aircraft-model.handler'
import { GetAircraftModelHandler } from '../handlers/aircraft-models/get-aircraft-model.handler'
import { RegisterAircraftModelDto } from '../dtos/aircraft-models/register-aircraft-model.dto'

@Controller('aircraft-models')
export class AircraftModelsController {
  constructor(
    private readonly registerAircraftModelHandler: RegisterAircraftModelHandler,
    private readonly listAircraftModelCatalogueHandler: ListAircraftModelCatalogueHandler,
    private readonly getAircraftModelHandler: GetAircraftModelHandler,
    private readonly removeAircraftModelHandler: RemoveAircraftModelHandler
  ) {}

  @Post()
  register(@Body() body: RegisterAircraftModelDto) {
    return this.registerAircraftModelHandler.run(body)
  }

  @Get('catalogue')
  listCatalogue() {
    return this.listAircraftModelCatalogueHandler.run()
  }

  @Get(':id')
  get(@Param('id', ParseUUIDv7Pipe) id: string) {
    return this.getAircraftModelHandler.run(id)
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDv7Pipe) id: string) {
    return this.removeAircraftModelHandler.run(id)
  }
}
