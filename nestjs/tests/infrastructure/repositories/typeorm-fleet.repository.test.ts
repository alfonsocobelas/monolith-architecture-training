import { v7 as uuidv7 } from 'uuid'
import { TypeOrmFleetRepository } from 'src/modules/fleets/infrastructure/typeorm/typeorm-fleet.repository'
import { FleetWithNameSpecification } from 'src/modules/fleets/domain/specifications/fleet-with-name.specification'
import { TypeOrmCriteriaConverter } from 'src/infrastructure/persistence/typeorm/typeorm-criteria-converter'
import { FleetBuilder } from '../../modules/fleets/domain/fleet.builder'
import { queryRunner } from '../../jest.setup.integration'
import { setupCompany } from './helpers/setup-company'

let repository: TypeOrmFleetRepository
let companyId: string

beforeEach(async () => {
  const connection = queryRunner.manager.connection
  companyId = await setupCompany(connection)
  repository = new TypeOrmFleetRepository(connection, new TypeOrmCriteriaConverter())
})

describe('FleetRepository (integration tests)', () => {
  describe('register method', () => {
    it('should register a new fleet', async () => {
      const fleet = FleetBuilder.aFleet().withCompanyId(companyId).build()

      await repository.register(fleet)
    })
  })

  describe('get method', () => {
    it('should return a fleet by its id', async () => {
      const fleet = FleetBuilder.aFleet().withCompanyId(companyId).build()

      await repository.register(fleet)
      const foundFleet = await repository.get(fleet.id)

      expect(foundFleet).toEqual(fleet)
    })

    it('should return null if fleet does not exist', async () => {
      const nonExistingId = uuidv7()
      const foundFleet = await repository.get(nonExistingId)
      expect(foundFleet).toBeNull()
    })
  })

  describe('exists method', () => {
    it('should return true if a fleet with the given name exists', async () => {
      const fleet = FleetBuilder.aFleet().withCompanyId(companyId).build()
      await repository.register(fleet)

      const criteria = new FleetWithNameSpecification(fleet.name)
      const exists = await repository.exists(criteria)

      expect(exists).toBe(true)
    })

    it('should return false if no fleet with the given name exists', async () => {
      const nonExistingFleetName = 'NonExistingFleetName'
      const criteria = new FleetWithNameSpecification(nonExistingFleetName)
      const exists = await repository.exists(criteria)

      expect(exists).toBe(false)
    })
  })

  describe('matching method', () => {
    it('should return a list of fleets matching the criteria', async () => {
      const fleet1 = FleetBuilder.aFleet().withCompanyId(companyId).build()
      const fleet2 = FleetBuilder.aFleet().withCompanyId(companyId).build()

      await repository.register(fleet1)
      await repository.register(fleet2)

      const criteria = new FleetWithNameSpecification(fleet1.name)
      const matchingFleets = await repository.matching(criteria)

      expect(matchingFleets).toHaveLength(1)
      expect(matchingFleets[0]).toEqual(fleet1)
    })

    it('should return an empty list if no fleet matches the criteria', async () => {
      const nonExistingFleetName = 'NonExistingFleetName'
      const criteria = new FleetWithNameSpecification(nonExistingFleetName)
      const matchingFleets = await repository.matching(criteria)

      expect(matchingFleets).toHaveLength(0)
    })
  })

  describe('count method', () => {
    it('should return the count of fleets matching the criteria', async () => {
      const fleet1 = FleetBuilder.aFleet().withCompanyId(companyId).build()
      const fleet2 = FleetBuilder.aFleet().withCompanyId(companyId).build()

      await repository.register(fleet1)
      await repository.register(fleet2)

      const criteria = new FleetWithNameSpecification(fleet1.name)
      const count = await repository.count(criteria)

      expect(count).toBe(1)
    })

    it('should return 0 if no fleet matches the criteria', async () => {
      const nonExistingFleetName = 'NonExistingFleetName'
      const criteria = new FleetWithNameSpecification(nonExistingFleetName)
      const count = await repository.count(criteria)

      expect(count).toBe(0)
    })
  })

  describe('save method', () => {
    it('should update an existing fleet', async () => {
      const fleet = FleetBuilder.aFleet().withCompanyId(companyId).build()

      await repository.register(fleet)

      // Update some properties of the fleet
      const updatedName = 'Updated Fleet Name'
      const updatedFleet = FleetBuilder.aFleet().withName(updatedName).withId(fleet.id).withCompanyId(companyId).build()

      await repository.save(updatedFleet)

      const foundFleet = await repository.get(fleet.id)
      expect(foundFleet).toEqual(updatedFleet)
    })
  })
})
