import { v7 as uuidv7 } from 'uuid'
import { TypeOrmAircraftModelRepository } from 'src/modules/aircraft-models/infrastructure/typeorm/typeorm-aircraft-model.repository'
import { TypeOrmCriteriaConverter } from 'src/infrastructure/persistence/typeorm/typeorm-criteria-converter'
import { AircraftModelMother } from '../../modules/aircraft-models/domain/aircraft-model.mother'
import { queryRunner } from '../../jest.setup.integration'

let repository: TypeOrmAircraftModelRepository

beforeEach(async () => {
  repository = new TypeOrmAircraftModelRepository(queryRunner.manager.connection, new TypeOrmCriteriaConverter())
})

describe('AircraftModelRepository (integration tests)', () => {
  describe('register method', () => {
    it('should register a new aircraft model', async () => {
      const aircraftModel = AircraftModelMother.random()

      await repository.register(aircraftModel)
    })
  })

  describe('remove method', () => {
    it('should remove an existing aircraft model', async () => {
      const aircraftModel = AircraftModelMother.random()
      await repository.register(aircraftModel)
      await repository.remove(aircraftModel.id)

      const foundAircraftModel = await repository.get(aircraftModel.id)
      expect(foundAircraftModel).toBeNull()
    })
  })

  describe('get method', () => {
    it('should return an aircraft model by its id', async () => {
      const aircraftModel = AircraftModelMother.random()
      await repository.register(aircraftModel)
      const foundAircraftModel = await repository.get(aircraftModel.id)

      expect(foundAircraftModel).toEqual(aircraftModel)
    })

    it('should return null if aircraft model does not exist', async () => {
      const nonExistingId = uuidv7()
      const foundAircraftModel = await repository.get(nonExistingId)

      expect(foundAircraftModel).toBeNull()
    })
  })

  describe('listCatalogue method', () => {
    it('should return a list of all aircraft models in the catalogue', async () => {
      const aircraftModel1 = AircraftModelMother.random()
      const aircraftModel2 = AircraftModelMother.random()

      await repository.register(aircraftModel1)
      await repository.register(aircraftModel2)

      const catalogue = await repository.listCatalogue()

      expect(catalogue).toHaveLength(2)
      expect(catalogue).toEqual(expect.arrayContaining([aircraftModel1, aircraftModel2]))
    })
  })

  describe('exists method', () => {
    it('should return true if an aircraft model with the given code exists', async () => {
      const aircraftModel = AircraftModelMother.random()
      await repository.register(aircraftModel)

      const exists = await repository.exists(aircraftModel.code)
      expect(exists).toBe(true)
    })

    it('should return false if no aircraft model with the given code exists', async () => {
      const nonExistingCode = 'non-existing-code'
      const exists = await repository.exists(nonExistingCode)

      expect(exists).toBe(false)
    })
  })
})
