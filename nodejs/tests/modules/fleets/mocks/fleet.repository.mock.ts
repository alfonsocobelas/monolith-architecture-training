import { Fleet } from 'src/modules/fleets/domain/fleet'
import { Nullable } from 'src/common/nullable'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { MockRepository } from '../../shared/mocks/mock.repository'
import { FleetRepository } from 'src/modules/fleets/domain/fleet.repository'

export class FleetRepositoryMock extends MockRepository<Fleet> implements FleetRepository {
  register(fleet: Fleet): Promise<void> {
    return this.getMock('register')(fleet)
  }

  get(fleetId: string): Promise<Nullable<Fleet>> {
    return this.getMock('get')(fleetId)
  }

  save(fleet: Fleet | Fleet[]): Promise<void> {
    return this.getMock('save')(fleet)
  }

  matching(criteria: Criteria): Promise<Fleet[]> {
    return this.getMock('matching')(criteria)
  }

  exists(criteria: Criteria): Promise<boolean> {
    return this.getMock('exists')(criteria)
  }

  count(criteria: Criteria): Promise<number> {
    return this.getMock('count')(criteria)
  }

  // Helpers semánticos para el test
  givenFound(fleet: Fleet): void {
    this.setMockResult('get', fleet)
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

  whenRegisterSuccess(): void {
    this.setMockResult('register', undefined)
  }

  whenSaveSuccess(): void {
    this.setMockResult('save', undefined)
  }

  givenMatching(fleets: Fleet[]): void {
    this.setMockResult('matching', fleets)
  }

  givenCount(count: number): void {
    this.setMockResult('count', count)
  }
}
