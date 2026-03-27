import { AircraftModelRepository } from 'src/modules/aircraft-models/domain/aircraft-model.repository'
import { MockRepository } from '../../shared/mocks/mock.repository'
import { AircraftModel } from 'src/modules/aircraft-models/domain/aircraft-model'
import { Nullable } from 'src/common/nullable'

export class AircraftModelRepositoryMock
  extends MockRepository<AircraftModel>
  implements AircraftModelRepository
{
  register(aircraftModel: AircraftModel): Promise<void> {
    return this.getMock('register')(aircraftModel)
  }

  save(aircraftModels: AircraftModel | AircraftModel[]): Promise<void> {
    return this.getMock('save')(aircraftModels)
  }

  remove(modelId: string): Promise<void> {
    return this.getMock('remove')(modelId)
  }

  get(modelId: string): Promise<Nullable<AircraftModel>> {
    return this.getMock('get')(modelId)
  }

  exists(code: string): Promise<boolean> {
    return this.getMock('exists')(code)
  }

  listCatalogue(): Promise<AircraftModel[]> {
    return this.getMock('listCatalogue')()
  }

  // Helpers
  givenFound(model: AircraftModel): void {
    this.setMockResult('get', model)
  }

  givenNotFound(): void {
    this.setMockResult('get', null)
  }

  givenAlreadyExists(): void {
    this.setMockResult('exists', true)
  }

  givenDoesNotExist(): void {
    this.setMockResult('exists', false)
  }

  givenCatalogue(models: AircraftModel[]): void {
    this.setMockResult('listCatalogue', models)
  }

  whenRegisterSuccess(): void {
    this.setMockResult('register', undefined)
  }

  whenRegisterUnsuccess(error: Error): void {
    this.getMock('register').mockRejectedValue(error)
  }

  whenSaveSuccess(): void {
    this.setMockResult('save', Promise.resolve())
  }

  whenRemoveSuccess(): void {
    this.setMockResult('remove', undefined)
  }
}
