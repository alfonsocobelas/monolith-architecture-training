import { v7 as uuidv7 } from 'uuid'
import { TypeOrmAircraftRepository } from 'src/modules/aircrafts/infrastructure/typeorm/typeorm-aircraft.repository'
import { AircraftsOfModelSpecification } from 'src/modules/aircrafts/domain/specifications/aircrafts-of-model.specification'
import { AircraftWithTailNumberSpecification } from 'src/modules/aircrafts/domain/specifications/aircraft-with-tail-number.specification'
import { TypeOrmCriteriaConverter } from 'src/infrastructure/persistence/typeorm/typeorm-criteria-converter'
import { AircraftBuilder } from '../../modules/aircrafts/domain/aircraft.builder'
import { queryRunner } from '../../jest.setup.integration'
import { setupAircraftModel } from './helpers/setup-aircraft-model'

let repository: TypeOrmAircraftRepository
let modelId: string

beforeEach(async () => {
  const connection = queryRunner.manager.connection
  modelId = await setupAircraftModel(connection)
  repository = new TypeOrmAircraftRepository(connection, new TypeOrmCriteriaConverter())
})

describe('AircraftRepository (integration tests)', () => {
  describe('register method', () => {
    it('should create a new aircraft', async () => {
      const aircraft = AircraftBuilder.anAircraft().withModelId(modelId).build()

      await repository.register(aircraft)
      const foundAircraft = await repository.get(aircraft.id)

      expect(foundAircraft).toEqual(aircraft)
    })
  })

  describe('save method', () => {
    it('should save an existing aircraft', async () => {
      const aircraft = AircraftBuilder.anAircraft().withModelId(modelId).build()
      await repository.register(aircraft)

      // Update some properties of the aircraft
      const updatedFuelLevel = 80
      const updatedFlightHours = 150

      const updatedAircraft = AircraftBuilder.anAircraft()
        .withId(aircraft.id)
        .withModelId(modelId)
        .withFuelLevel(updatedFuelLevel)
        .withFlightHours(updatedFlightHours)
        .build()

      await repository.save(updatedAircraft)
      const foundAircraft = await repository.get(aircraft.id)

      expect(foundAircraft).toEqual(updatedAircraft)
    })
  })

  describe('remove method', () => {
    it('should delete an existing aircraft', async () => {
      const aircraft = AircraftBuilder.anAircraft().withModelId(modelId).build()

      await repository.register(aircraft)
      await repository.remove(aircraft)
      const foundAircraft = await repository.get(aircraft.id)

      expect(foundAircraft).toBeNull()
    })
  })

  describe('get method', () => {
    it('should return an aircraft by its id', async () => {
      const aircraft = AircraftBuilder.anAircraft().withModelId(modelId).build()

      await repository.register(aircraft)
      const foundAircraft = await repository.get(aircraft.id)

      expect(foundAircraft).toEqual(aircraft)
    })

    it('should return null if aircraft does not exist', async () => {
      const nonExistingId = uuidv7()
      const foundAircraft = await repository.get(nonExistingId)

      expect(foundAircraft).toBeNull()
    })
  })

  describe('getTechnicalSheet method', () => {
    it('should return the technical sheet of an aircraft by its id', async () => {
      const aircraft = AircraftBuilder.anAircraft().withModelId(modelId).build()

      await repository.register(aircraft)
      const technicalSheet = await repository.getTechnicalSheet(aircraft.id)

      expect(technicalSheet).toEqual(
        expect.objectContaining({
          id: aircraft.id,
          modelId: aircraft.modelId,
          tailNumber: aircraft.tailNumber,
          totalFlightHours: aircraft.totalFlightHours,
          fuelLevelPercentage: aircraft.fuelLevelPercentage,
          status: aircraft.status,
          model: expect.objectContaining({
            id: modelId
          }),
          engines: expect.any(Array)
        })
      )
    })

    it('should return null if aircraft does not exist', async () => {
      const nonExistingId = uuidv7()
      const technicalSheet = await repository.getTechnicalSheet(nonExistingId)

      expect(technicalSheet).toBeNull()
    })
  })

  describe('exists method', () => {
    it('should return true if an aircraft matching the criteria exists', async () => {
      const aircraft = AircraftBuilder.anAircraft().withModelId(modelId).build()
      await repository.register(aircraft)

      const criteria = new AircraftWithTailNumberSpecification(aircraft.tailNumber)
      const exists = await repository.exists(criteria)

      expect(exists).toBe(true)
    })

    it('should return false if no aircraft matching the criteria exists', async () => {
      const nonExistingTailNumber = 'NONEXISTINGTAIL'
      const criteria = new AircraftWithTailNumberSpecification(nonExistingTailNumber)
      const exists = await repository.exists(criteria)

      expect(exists).toBe(false)
    })
  })

  describe('count method', () => {
    it('should return the count of aircraft matching the criteria', async () => {
      const aircraft1 = AircraftBuilder.anAircraft().withModelId(modelId).build()
      const aircraft2 = AircraftBuilder.anAircraft().withModelId(modelId).build()

      await repository.register(aircraft1)
      await repository.register(aircraft2)

      const criteria = new AircraftsOfModelSpecification(modelId)
      const count = await repository.count(criteria)

      expect(count).toBe(2)
    })

    it('should return 0 if no aircraft matching the criteria exists', async () => {
      const nonExistingModelId = uuidv7()
      const criteria = new AircraftsOfModelSpecification(nonExistingModelId)
      const count = await repository.count(criteria)

      expect(count).toBe(0)
    })
  })

  describe('matching method', () => {
    it('should return a list of aircraft matching the criteria', async () => {
      const aircraft1 = AircraftBuilder.anAircraft().withModelId(modelId).build()
      const aircraft2 = AircraftBuilder.anAircraft().withModelId(modelId).build()

      await repository.register(aircraft1)
      await repository.register(aircraft2)

      const criteria = new AircraftsOfModelSpecification(modelId)
      const matchingAircrafts = await repository.matching(criteria)

      expect(matchingAircrafts).toHaveLength(2)
      expect(matchingAircrafts).toEqual(expect.arrayContaining([aircraft1, aircraft2]))
    })

    it('should return an empty list if no aircraft matching the criteria exists', async () => {
      const nonExistingModelId = uuidv7()
      const criteria = new AircraftsOfModelSpecification(nonExistingModelId)
      const matchingAircrafts = await repository.matching(criteria)

      expect(matchingAircrafts).toHaveLength(0)
    })
  })

  describe('find method', () => {
    it('should return a list of aircraft for the given ids', async () => {
      const aircraft1 = AircraftBuilder.anAircraft().withModelId(modelId).build()
      const aircraft2 = AircraftBuilder.anAircraft().withModelId(modelId).build()

      await repository.register(aircraft1)
      await repository.register(aircraft2)

      const foundAircrafts = await repository.find([aircraft1.id, aircraft2.id])

      expect(foundAircrafts).toHaveLength(2)
      expect(foundAircrafts).toEqual(expect.arrayContaining([aircraft1, aircraft2]))
    })

    it('should return an empty list if no aircraft with the given ids exist', async () => {
      const nonExistingId1 = uuidv7()
      const nonExistingId2 = uuidv7()

      const foundAircrafts = await repository.find([nonExistingId1, nonExistingId2])

      expect(foundAircrafts).toHaveLength(0)
    })
  })

  describe('findTechnicalSheets method', () => {
    it('should return a list of aircraft technical sheets for the given ids', async () => {
      const aircraft1 = AircraftBuilder.anAircraft().withModelId(modelId).build()
      const aircraft2 = AircraftBuilder.anAircraft().withModelId(modelId).build()

      await repository.register(aircraft1)
      await repository.register(aircraft2)

      const foundTechnicalSheets = await repository.findTechnicalSheets([aircraft1.id, aircraft2.id])

      expect(foundTechnicalSheets).toHaveLength(2)
      expect(foundTechnicalSheets[0].id).toBe(aircraft1.id)
      expect(foundTechnicalSheets[1].id).toBe(aircraft2.id)
    })

    it('should return an empty list if no aircraft with the given ids exist', async () => {
      const nonExistingId1 = uuidv7()
      const nonExistingId2 = uuidv7()

      const foundTechnicalSheets = await repository.findTechnicalSheets([nonExistingId1, nonExistingId2])

      expect(foundTechnicalSheets).toHaveLength(0)
    })
  })
})
