import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { GetAircraftHandler } from '../handlers/aircrafts/get-aircraft.handler'
import { RemoveAircraftHandler } from '../handlers/aircrafts/remove-aircraft.handler'
import { SearchAircraftsHandler } from '../handlers/aircrafts/search-aircrafts.handler'
import { RegisterAircraftHandler } from '../handlers/aircrafts/register-aircraft.handler'
import { InstallEngineInAircraftHandler } from '../handlers/aircrafts/install-engine-in-aircraft.handler'
import { RemoveEngineFromAircraftHandler } from '../handlers/aircrafts/remove-engine-from-aircraft.handler'
import { FindAircraftsInMaintenanceHandler } from '../handlers/aircrafts/find-aircrafts-in-maintenance.handler'
import { IdParamDto } from '../dtos/shared/id-param.dto'
import { PaginateOffsetDto } from '../dtos/shared/paginate-offset.dto'
import { RegisterAircraftDto } from '../dtos/aircrafts/register-aircraft.dto'
import { RemoveEngineFromAircraftDto } from '../dtos/aircrafts/remove-engine-from-aircraft.dto'

@Controller('aircrafts')
export class AircraftsController {
  constructor(
    private readonly registerAircraftHandler: RegisterAircraftHandler,
    private readonly getAircraftHandler: GetAircraftHandler,
    private readonly findAircraftsInMaintenanceHandler: FindAircraftsInMaintenanceHandler,
    private readonly removeAircraftHandler: RemoveAircraftHandler,
    private readonly installEngineInAircraftHandler: InstallEngineInAircraftHandler,
    private readonly removeEngineFromAircraftHandler: RemoveEngineFromAircraftHandler,
    private readonly searchAircraftsHandler: SearchAircraftsHandler
  ) {}

  @Post()
  register(@Body() body: RegisterAircraftDto) {
    return this.registerAircraftHandler.run(body)
  }

  @Get('maintenance')
  findInMaintenance() {
    return this.findAircraftsInMaintenanceHandler.run()
  }

  @Get()
  search(@Param() params: PaginateOffsetDto) {
    return this.searchAircraftsHandler.run(params)
  }

  @Get(':id')
  get(@Param('id') id: IdParamDto) {
    return this.getAircraftHandler.run(id)
  }

  @Post(':aircraftId/engines/:engineId/install')
  installEngine(@Param() params: RemoveEngineFromAircraftDto) {
    return this.installEngineInAircraftHandler.run(params)
  }

  @Post(':aircraftId/engines/:engineId/uninstall')
  uninstallEngine(@Param() params: RemoveEngineFromAircraftDto) {
    return this.removeEngineFromAircraftHandler.run(params)
  }

  @Delete(':id')
  remove(@Param('id') id: IdParamDto) {
    return this.removeAircraftHandler.run(id)
  }
}
