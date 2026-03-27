import { Nullable } from 'src/common/nullable'
import { AircraftModel } from './aircraft-model'

export interface AircraftModelRepository {
  register(aircraftModel: AircraftModel): Promise<void>
  save(aircraftModels: AircraftModel | AircraftModel[]): Promise<void>
  remove(modelId: string): Promise<void>
  get(modelId: string): Promise<Nullable<AircraftModel>>
  exists(code: string): Promise<boolean>
  listCatalogue(): Promise<AircraftModel[]>
}
