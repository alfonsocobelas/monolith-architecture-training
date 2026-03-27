import { Nullable } from 'src/common/nullable'
import { AircraftModel } from './aircraft-model'

export abstract class AircraftModelRepository {
  abstract register(aircraftModel: AircraftModel): Promise<void>
  abstract save(aircraftModels: AircraftModel | AircraftModel[]): Promise<void>
  abstract remove(modelId: string): Promise<void>
  abstract get(modelId: string): Promise<Nullable<AircraftModel>>
  abstract exists(code: string): Promise<boolean>
  abstract listCatalogue(): Promise<AircraftModel[]>
}
