import fc from 'fast-check'
import { v7 as uuidv7 } from 'uuid'
import { normalizeString } from 'src/modules/shared/utils/normalize'
import { Fleet } from 'src/modules/fleets/domain/fleet'
import { FleetStatus, FleetType, OperationRegion } from 'src/modules/fleets/domain/fleet-enums'
import { FLEET_CONSTRAINTS as LIMITS } from 'src/modules/fleets/domain/fleet-constants'
import { FleetBuilder } from './fleet.builder'

describe('Fleet domain model (unit/property-based tests)', () => {

  describe('Invariants', () => {
    describe('id validation', () => {
      it('should throw error if ID is not UUID v7', () => {
        fc.assert(
          fc.property(fc.uuid({ version: 4 }), (invalidId) => {
            const builder = FleetBuilder.aFleet().withId(invalidId)

            expect(() => builder.create()).toThrow('Invalid id')
          })
        )
      })
    })

    describe('companyId validation', () => {
      it('should throw error if company ID is not UUID v7', () => {
        fc.assert(
          fc.property(fc.uuid({ version: 4 }), (invalidCompanyId) => {
            const builder = FleetBuilder.aFleet().withCompanyId(invalidCompanyId)

            expect(() => builder.create()).toThrow('Invalid company id')
          })
        )
      })
    })

    describe('name validation', () => {
      it('should throw if name is empty or only whitespace', () => {
        fc.assert(
          fc.property(
            fc.constantFrom('', ' ', '\t', '\n', '\r\n', '   \t\n  '),
            (invalidName) => {
              const builder = FleetBuilder.aFleet().withName(invalidName)

              expect(() => builder.create()).toThrow('Name cannot be empty')
            }
          )
        )
      })

      it('should fail if name is less than 2 characters', () => {
        fc.assert(
          fc.property(
            fc.string({ minLength: 0, maxLength: LIMITS.NAME.MIN_LENGTH - 1 })
              .filter(s => normalizeString(s).length > 0),
            (shortName) => {
              const builder = FleetBuilder.aFleet().withName(shortName)

              expect(() => builder.create()).toThrow(`Name must be at least ${LIMITS.NAME.MIN_LENGTH} characters`)
            }
          )
        )
      })

      it('should fail if name is greater than 100 characters', () => {
        fc.assert(
          fc.property(
            fc.string({ minLength: LIMITS.NAME.MAX_LENGTH + 1 })
              .filter(s => normalizeString(s).length > LIMITS.NAME.MAX_LENGTH),
            (longName) => {
              const builder = FleetBuilder.aFleet().withName(longName)

              expect(() => builder.create()).toThrow(`Name must be less than or equal to ${LIMITS.NAME.MAX_LENGTH} characters`)
            }
          )
        )
      })
    })

    describe('maintenance budget validation', () => {
      it('should fail if maintenance budget is not a number', () => {
        fc.assert(
          fc.property(fc.string(), (invalidBudget) => {
            const builder = FleetBuilder.aFleet().withMaintenanceBudget(invalidBudget as unknown as number)

            expect(() => builder.create()).toThrow('Invalid maintenance budget')
          })
        )
      })

      it('should fail if maintenance budget is not an integer', () => {
        fc.assert(
          fc.property(fc.float().filter(f => !Number.isInteger(f)), (invalidBudget) => {
            const builder = FleetBuilder.aFleet().withMaintenanceBudget(invalidBudget)

            expect(() => builder.create()).toThrow('Invalid maintenance budget')
          })
        )
      })

      it('should fail if maintenance budget is less than 0', () => {
        fc.assert(
          fc.property(fc.integer({ max: LIMITS.MAINTENANCE_BUDGET.MIN - 1 }), (lowBudget) => {
            const builder = FleetBuilder.aFleet().withMaintenanceBudget(lowBudget)

            expect(() => builder.create()).toThrow(`Maintenance budget must be at least ${LIMITS.MAINTENANCE_BUDGET.MIN}`)
          })
        )
      })

      it('should fail if maintenance budget is greater than 10000', () => {
        fc.assert(
          fc.property(fc.integer({ min: LIMITS.MAINTENANCE_BUDGET.MAX + 1 }), (highBudget) => {
            const builder = FleetBuilder.aFleet().withMaintenanceBudget(highBudget)

            expect(() => builder.create()).toThrow(`Maintenance budget must be less than ${LIMITS.MAINTENANCE_BUDGET.MAX}`)
          })
        )
      })
    })

    describe('operation region validation', () => {
      it('should throw if operation region is invalid', () => {
        fc.assert(
          fc.property(fc.string().filter(s => !(s in OperationRegion)), (invalidRegion) => {
            const builder = FleetBuilder.aFleet().withOperationRegion(invalidRegion as OperationRegion)

            expect(() => builder.create()).toThrow(`Invalid operation region: ${invalidRegion}`)
          })
        )
      })
    })

    describe('type validation', () => {
      it('should throw if fleet type is invalid', () => {
        fc.assert(
          fc.property(fc.string().filter(s => !(s in FleetType)), (invalidType) => {
            const builder = FleetBuilder.aFleet().withType(invalidType as FleetType)

            expect(() => builder.create()).toThrow(`Invalid fleet type: ${invalidType}`)
          })
        )
      })
    })

    describe('aircraft IDs validation', () => {
      it('should throw if no aircraft IDs are provided', () => {
        const builder = FleetBuilder.aFleet().withAircraftIds([])

        expect(() => builder.create()).toThrow('A fleet must be registered with at least one aircraft')
      })
    })
  })

  describe('Business rules', () => {
    describe('on creation', () => {
      it('should create a valid fleet with default values', () => {
        const fleet = FleetBuilder.aFleet().create()

        expect(fleet).toBeInstanceOf(Fleet)
        expect(fleet).toHaveProperty('companyId')
        expect(fleet).toHaveProperty('name')
        expect(fleet).toHaveProperty('type')
        expect(fleet).toHaveProperty('operationRegion')
        expect(fleet).toHaveProperty('maintenanceBudget')
        expect(fleet).toHaveProperty('aircraftIds')
        expect(fleet.status).toBe(FleetStatus.DRAFT)
      })
    })

    describe('on addition', () => {
      it('should not allow adding the same aircraft twice', () => {
        const fleet = FleetBuilder.aFleet().build()
        const aircraftId = uuidv7()

        fleet.addAircraft(aircraftId)

        expect(() => fleet.addAircraft(aircraftId)).toThrow(`Aircraft with id ${aircraftId} is already part of the fleet`)
      })
    })

    describe('on retirement', () => {
      it('should not allow retiring an aircraft that is not part of the fleet', () => {
        const fleet = FleetBuilder.aFleet().build()
        const aircraftId = uuidv7()

        expect(() => fleet.retireAircraft(aircraftId)).toThrow(`Aircraft with id ${aircraftId} is not part of the fleet`)
      })

      it('should not allow retiring an already retired fleet', () => {
        const fleet = FleetBuilder.aFleet().build()

        fleet.prepareForRetire()

        expect(() => fleet.prepareForRetire()).toThrow('Fleet is already retired')
      })
    })
  })
})
