import { v7 as uuidv7 } from 'uuid'
import { TypeOrmEngineRepository } from 'src/modules/engines/infrastructure/typeorm/typeorm-engine.repository'
import { TypeOrmCriteriaConverter } from 'src/infrastructure/persistence/typeorm/typeorm-criteria-converter'
import { EngineBuilder } from '../../modules/engines/domain/engine.builder'
import { EngineMother } from '../../modules/engines/domain/engine.mother'
import { queryRunner } from '../../jest.setup.integration'

let repository: TypeOrmEngineRepository

beforeEach(async () => {
  repository = new TypeOrmEngineRepository(queryRunner.manager.connection, new TypeOrmCriteriaConverter())
})

describe('EngineRepository (integration tests)', () => {
  describe('register method', () => {
    it('should register a new engine', async () => {
      const engine = EngineMother.random()

      await repository.register(engine)
    })
  })

  describe('get method', () => {
    it('should return an engine by its id', async () => {
      const engine = EngineMother.random()

      await repository.register(engine)
      const foundEngine = await repository.get(engine.id)

      expect(foundEngine).toEqual(engine)
    })

    it('should return null if engine does not exist', async () => {
      const nonExistingId = uuidv7()
      const foundEngine = await repository.get(nonExistingId)

      expect(foundEngine).toBeNull()
    })
  })

  describe('exists method', () => {
    it('should return true if an engine with the given serial number exists', async () => {
      const engine = EngineMother.random()
      await repository.register(engine)

      const exists = await repository.exists(engine.serialNumber)

      expect(exists).toBe(true)
    })

    it('should return false if no engine with the given serial number exists', async () => {
      const nonExistingSerialNumber = 'NONEXISTINGSN'
      const exists = await repository.exists(nonExistingSerialNumber)

      expect(exists).toBe(false)
    })
  })

  describe('save method', () => {
    it('should update an existing engine', async () => {
      const engine = EngineMother.random()
      await repository.register(engine)

      // Update some properties of the engine
      const updatedHealth = 80
      const updatedEngine = EngineBuilder.anEngine()
        .withId(engine.id)
        .withSerialNumber(engine.serialNumber)
        .withHealth(updatedHealth)
        .build()

      await repository.save(updatedEngine)

      const foundEngine = await repository.get(engine.id)
      expect(foundEngine).toEqual(updatedEngine)
    })

    it('should save multiple engines at once', async () => {
      const engine1 = EngineMother.random()
      const engine2 = EngineMother.random()

      await repository.register(engine1)
      await repository.register(engine2)

      // Update some properties of the engines
      const updatedHealth1 = 80
      const updatedHealth2 = 90
      const updatedEngine1 = EngineBuilder.anEngine()
        .withId(engine1.id)
        .withSerialNumber(engine1.serialNumber)
        .withHealth(updatedHealth1)
        .build()

      const updatedEngine2 = EngineBuilder.anEngine()
        .withId(engine2.id)
        .withSerialNumber(engine2.serialNumber)
        .withHealth(updatedHealth2)
        .build()

      await repository.save([updatedEngine1, updatedEngine2])

      const foundEngine1 = await repository.get(engine1.id)
      const foundEngine2 = await repository.get(engine2.id)

      expect(foundEngine1).toEqual(updatedEngine1)
      expect(foundEngine2).toEqual(updatedEngine2)
    })
  })
})
