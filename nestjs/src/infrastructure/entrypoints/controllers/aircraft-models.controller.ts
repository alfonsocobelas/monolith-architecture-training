import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { RegisterAircraftModelHandler } from '../handlers/aircraft-models/register-aircraft-model.handler'
import { ListAircraftModelCatalogueHandler } from '../handlers/aircraft-models/list-aircraft-model-catalogue.handler'
import { RemoveAircraftModelHandler } from '../handlers/aircraft-models/remove-aircraft-model.handler'
import { GetAircraftModelHandler } from '../handlers/aircraft-models/get-aircraft-model.handler'
import { IdParamDto } from '../dtos/shared/id-param.dto'
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
  get(@Param('id') id: IdParamDto) {
    return this.getAircraftModelHandler.run(id)
  }

  @Delete(':id')
  remove(@Param('id') id: IdParamDto) {
    return this.removeAircraftModelHandler.run(id)
  }
}
