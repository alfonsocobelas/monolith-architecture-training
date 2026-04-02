import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common'
import { GetAircraftHandler } from '../handlers/aircrafts/get-aircraft.handler'
import { RemoveAircraftHandler } from '../handlers/aircrafts/remove-aircraft.handler'
import { SearchAircraftsHandler } from '../handlers/aircrafts/search-aircrafts.handler'
import { RegisterAircraftHandler } from '../handlers/aircrafts/register-aircraft.handler'
import { InstallEngineInAircraftHandler } from '../handlers/aircrafts/install-engine-in-aircraft.handler'
import { RemoveEngineFromAircraftHandler } from '../handlers/aircrafts/remove-engine-from-aircraft.handler'
import { FindAircraftsInMaintenanceHandler } from '../handlers/aircrafts/find-aircrafts-in-maintenance.handler'
import { PaginateOffsetDto } from '../dtos/shared/paginate-offset.dto'
import { RegisterAircraftDto } from '../dtos/aircrafts/register-aircraft.dto'
import { ParseUUIDv7Pipe } from '../pipes/parse-uuid-v7.pipe'
import { ParseCriteriaPipe } from '../pipes/parse-criteria.pipe'

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
  search(@Query(new ParseCriteriaPipe()) query: PaginateOffsetDto) {
    return this.searchAircraftsHandler.run(query)
  }

  @Get(':id')
  get(@Param('id', ParseUUIDv7Pipe) id: string) {
    return this.getAircraftHandler.run(id)
  }

  @Post(':aircraftId/engines/:engineId/install')
  installEngine(
    @Param('aircraftId', ParseUUIDv7Pipe) aircraftId: string,
    @Param('engineId', ParseUUIDv7Pipe) engineId: string
  ) {
    return this.installEngineInAircraftHandler.run(aircraftId, engineId)
  }

  @Post(':aircraftId/engines/:engineId/uninstall')
  uninstallEngine(
    @Param('aircraftId', ParseUUIDv7Pipe) aircraftId: string,
    @Param('engineId', ParseUUIDv7Pipe) engineId: string
  ) {
    return this.removeEngineFromAircraftHandler.run(aircraftId, engineId)
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDv7Pipe) id: string) {
    return this.removeAircraftHandler.run(id)
  }
}
