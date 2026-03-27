import { Aircraft } from 'src/modules/aircrafts/domain/aircraft'
import { Nullable } from 'src/common/nullable'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { AircraftReadModel } from 'src/modules/aircrafts/domain/aircraft-types'
import { AircraftRepository } from 'src/modules/aircrafts/domain/aircraft.repository'
import { MockRepository } from '../../shared/mocks/mock.repository'

export class AircraftRepositoryMock
  extends MockRepository<Aircraft>
  implements AircraftRepository
{
  register(aircraft: Aircraft): Promise<void> {
    return this.getMock('register')(aircraft)
  }

  save(aircrafts: Aircraft | Aircraft[]): Promise<void> {
    return this.getMock('save')(aircrafts)
  }

  remove(aircraft: Aircraft): Promise<void> {
    return this.getMock('remove')(aircraft)
  }

  get(aircraftId: string): Promise<Nullable<Aircraft>> {
    return this.getMock('get')(aircraftId)
  }

  getTechnicalSheet(aircraftId: string): Promise<Nullable<AircraftReadModel>> {
    return this.getMock('getTechnicalSheet')(aircraftId)
  }

  find(aircraftIds: string[]): Promise<Aircraft[]> {
    return this.getMock('find')(aircraftIds)
  }

  matching(criteria: Criteria): Promise<Aircraft[]> {
    return this.getMock('matching')(criteria)
  }

  count(criteria: Criteria): Promise<number> {
    return this.getMock('count')(criteria)
  }

  exists(criteria: Criteria): Promise<boolean> {
    return this.getMock('exists')(criteria)
  }

  // helpers
  givenFound(aircraft: Aircraft): void {
    this.setMockResult('get', aircraft)
  }

  givenNotFound(): void {
    this.setMockResult('get', null)
  }

  givenAircraftsFound(aircrafts: Aircraft[]): void {
    this.setMockResult('find', aircrafts)
  }

  givenNoAircraftsFound(): void {
    this.setMockResult('find', [])
  }

  givenTechnicalSheet(sheet: AircraftReadModel): void {
    this.setMockResult('getTechnicalSheet', sheet)
  }

  givenNoTechnicalSheet(): void {
    this.setMockResult('getTechnicalSheet', null)
  }

  givenMatching(aircrafts: Aircraft[]): void {
    this.setMockResult('matching', aircrafts)
  }

  givenCount(count: number): void {
    this.setMockResult('count', count)
  }

  givenAlreadyExists(): void {
    this.setMockResult('exists', true)
  }

  givenDoesNotExist(): void {
    this.setMockResult('exists', false)
  }

  whenRegisterSuccess(): void {
    this.setMockResult('register', undefined)
  }

  whenSaveSuccess(): void {
    this.setMockResult('save', undefined)
  }

  whenRemoveSuccess(): void {
    this.setMockResult('remove', undefined)
  }
}
