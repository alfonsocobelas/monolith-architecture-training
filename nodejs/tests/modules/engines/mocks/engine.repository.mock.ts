import { Engine } from 'src/modules/engines/domain/engine'
import { Nullable } from 'src/common/nullable'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { EngineRepository } from 'src/modules/engines/domain/engine.repository'
import { MockRepository } from '../../shared/mocks/mock.repository'

export class EngineRepositoryMock extends MockRepository<Engine> implements EngineRepository {
  register(engine: Engine): Promise<void> {
    return this.getMock('register')(engine)
  }

  get(engineId: string): Promise<Nullable<Engine>> {
    return this.getMock('get')(engineId)
  }

  save(engines: Engine | Engine[]): Promise<void> {
    return this.getMock('save')(engines)
  }

  exists(serialNumber: string): Promise<boolean> {
    return this.getMock('exists')(serialNumber)
  }

  matching(criteria: Criteria): Promise<Engine[]> {
    return this.getMock('matching')(criteria)
  }

  // Helpers
  givenFound(engine: Engine): void {
    this.setMockResult('get', engine)
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

  givenMatching(engines: Engine[]): void {
    this.setMockResult('matching', engines)
  }
}
