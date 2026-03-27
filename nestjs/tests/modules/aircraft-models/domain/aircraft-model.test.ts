import fc from 'fast-check'
import { normalizeString } from 'src/modules/shared/utils/normalize'
import { AircraftModel } from 'src/modules/aircraft-models/domain/aircraft-model'
import { AircraftModelStatus } from 'src/modules/aircraft-models/domain/aircraft-model-enums'
import { AIRCRAFT_MODEL_CONSTRAINTS as LIMITS } from 'src/modules/aircraft-models/domain/aircraft-model-constants'
import { AircraftModelBuilder } from './aircraft-model.builder'
import { AircraftModelMother } from './aircraft-model.mother'

describe('AircraftModel domain model (unit/property-based test)', () => {

  describe('Invariants', () => {
    describe('id validation', () => {
      it('should fail if ID is not a valid UUID v7', () => {
        fc.assert(
          fc.property(fc.uuid({ version: 4 }), (invalidId) => {
            const builder = AircraftModelBuilder.aModel().withId(invalidId)

            expect(() => builder.create()).toThrow('Invalid id')
          })
        )
      })
    })

    describe('code validations', () => {
      it('should fail if normalized code is empty string', () => {
        fc.assert(
          fc.property(
            fc.constantFrom('', ' ', '\t', '\n', '\r\n', '   \t\n  '),
            (invalidCode) => {
              const builder = AircraftModelBuilder.aModel().withCode(invalidCode)

              expect(() => builder.create()).toThrow('Code cannot be empty')
            }
          )
        )
      })

      it('should fail if normalized code is less than 2 characters', () => {
        fc.assert(
          fc.property(
            fc.string({ minLength: 1, maxLength: LIMITS.CODE.MIN_LENGTH - 1 })
              .filter(str => normalizeString(str).length > 0),
            (shortCode) => {
              const builder = AircraftModelBuilder.aModel().withCode(shortCode)

              expect(() => builder.create()).toThrow(`Code must be at least ${LIMITS.CODE.MIN_LENGTH} characters`)
            }
          )
        )
      })

      it('should fail if normalized code exceeds 10 characters', () => {
        fc.assert(
          fc.property(
            fc.string({ minLength: LIMITS.CODE.MAX_LENGTH + 1 })
              .filter(str => normalizeString(str).length > LIMITS.CODE.MAX_LENGTH),
            (longCode) => {
              const builder = AircraftModelBuilder.aModel().withCode(longCode)

              expect(() => builder.create()).toThrow(`Code must be less than or equal to ${LIMITS.CODE.MAX_LENGTH} characters`)
            }
          )
        )
      })
    })

    describe('name validations', () => {
      it('should fail if name is empty or only whitespace', () => {
        const builder = AircraftModelBuilder.aModel().withName('   ')

        expect(() => builder.create()).toThrow('Name cannot be empty')
      })

      it('should fail if name is less than 2 characters', () => {
        fc.assert(
          fc.property(
            fc.string({ minLength: 1, maxLength: LIMITS.NAME.MIN_LENGTH - 1 })
              .filter(str => normalizeString(str).length > 0),
            (shortName) => {
              const builder = AircraftModelBuilder.aModel().withName(shortName)

              expect(() => builder.create()).toThrow(`Name must be at least ${LIMITS.NAME.MIN_LENGTH} characters`)
            }
          )
        )
      })

      it('should fail if name exceeds 30 characters', () => {
        fc.assert(
          fc.property(
            fc.string({ minLength: LIMITS.NAME.MAX_LENGTH + 1 })
              .filter(str => normalizeString(str).length > LIMITS.NAME.MAX_LENGTH),
            (longName) => {
              const builder = AircraftModelBuilder.aModel().withName(longName)

              expect(() => builder.create()).toThrow(`Name must be less than or equal to ${LIMITS.NAME.MAX_LENGTH} characters`)
            }
          )
        )
      })
    })

    describe('manufacturer validations', () => {
      it('should fail if manufacturer is empty or only whitespace', () => {
        fc.assert(
          fc.property(
            fc.constantFrom('', ' ', '\t', '\n', '\r\n', '   \t\n  '),
            (invalidName) => {
              const builder = AircraftModelBuilder.aModel().withManufacturer(invalidName)

              expect(() => builder.create()).toThrow('Manufacturer cannot be empty')
            }
          )
        )
      })

      it('should fail if manufacturer is less than 2 characters', () => {
        fc.assert(
          fc.property(
            fc.string({ minLength: 1, maxLength: LIMITS.MANUFACTURER.MIN_LENGTH - 1 })
              .filter(str => normalizeString(str).length > 0),
            (shortManufacturer) => {
              const builder = AircraftModelBuilder.aModel().withManufacturer(shortManufacturer)

              expect(() => builder.create()).toThrow(`Manufacturer must be at least ${LIMITS.MANUFACTURER.MIN_LENGTH} characters`)
            }
          )
        )
      })

      it('should fail if manufacturer exceeds 20 characters', () => {
        fc.assert(
          fc.property(
            fc.string({ minLength: LIMITS.MANUFACTURER.MAX_LENGTH + 1 })
              .filter(str => normalizeString(str).length > LIMITS.MANUFACTURER.MAX_LENGTH),
            (longManufacturer) => {
              const builder = AircraftModelBuilder.aModel().withManufacturer(longManufacturer)

              expect(() => builder.create()).toThrow(`Manufacturer must be less than or equal to ${LIMITS.MANUFACTURER.MAX_LENGTH} characters`)
            }
          )
        )
      })
    })

    describe('engine validations', () => {
      it('should fail if number of engines is not an integer', () => {
        fc.assert(
          fc.property(
            fc.double({ min: LIMITS.ENGINES.MIN, max: LIMITS.ENGINES.MAX, noNaN: true })
              .filter(num => !Number.isInteger(num)),
            (decimalEngine) => {
              const builder = AircraftModelBuilder.aModel().withNumEngines(decimalEngine)

              expect(() => builder.create()).toThrow('Number of engines must be an integer')
            }
          )
        )
      })

      it('should fail if number of engines is less than 1', () => {
        fc.assert(
          fc.property(
            fc.integer().filter(num => num < LIMITS.ENGINES.MIN),
            (invalidNumEngines) => {
              const builder = AircraftModelBuilder.aModel().withNumEngines(invalidNumEngines)

              expect(() => builder.create()).toThrow(`Number of engines must be greater than or equal to ${LIMITS.ENGINES.MIN}`)
            }
          )
        )
      })

      it('should fail if number of engines is greater than 6', () => {
        fc.assert(
          fc.property(
            fc.integer({ min: LIMITS.ENGINES.MAX + 1 }),
            (invalidNumEngines) => {
              const builder = AircraftModelBuilder.aModel().withNumEngines(invalidNumEngines)

              expect(() => builder.create()).toThrow(`Number of engines must be less than or equal to ${LIMITS.ENGINES.MAX}`)
            }
          )
        )
      })
    })

    describe('passenger capacity validations', () => {
      it('should fail if passenger capacity is not an integer', () => {
        fc.assert(
          fc.property(
            fc.double({ min: LIMITS.PASSENGERS.MIN, max: LIMITS.PASSENGERS.MAX, noNaN: true })
              .filter(num => !Number.isInteger(num)),
            (decimalCapacity) => {
              const builder = AircraftModelBuilder.aModel().withPassengers(decimalCapacity)

              expect(() => builder.create()).toThrow('Passenger capacity must be an integer')
            }
          )
        )
      })

      it('should fail if passenger capacity is less than 1', () => {
        fc.assert(
          fc.property(
            fc.integer({ max: LIMITS.PASSENGERS.MIN - 1 }),
            (invalidQty) => {
              const builder = AircraftModelBuilder.aModel().withPassengers(invalidQty)

              expect(() => builder.create()).toThrow(`Passenger capacity must be greater than or equal to ${LIMITS.PASSENGERS.MIN}`)
            }
          )
        )
      })

      it('should fail if passenger capacity is greater than 400', () => {
        fc.assert(
          fc.property(
            fc.integer({ min: LIMITS.PASSENGERS.MAX + 1 }),
            (invalidQty) => {
              const builder = AircraftModelBuilder.aModel().withPassengers(invalidQty)

              expect(() => builder.create()).toThrow(`Passenger capacity must be less than or equal to ${LIMITS.PASSENGERS.MAX}`)
            }
          )
        )
      })
    })
  })

  describe('Business rules', () => {
    describe('on creation', () => {
      it('should create a valid aircraft model in DRAFT status', () => {
        const model = AircraftModelBuilder.aModel().create()

        expect(model).toBeInstanceOf(AircraftModel)
        expect(model).toHaveProperty('id')
        expect(model).toHaveProperty('name')
        expect(model).toHaveProperty('code')
        expect(model).toHaveProperty('manufacturer')
        expect(model).toHaveProperty('passengerCapacity')
        expect(model).toHaveProperty('numEngines')
        expect(model.status).toBe(AircraftModelStatus.DRAFT)
      })

      it('should normalize the aircraft code when creating a new model', () => {
        const model = AircraftModelBuilder.aModel().withCode('  b737-max  ').create()

        expect(model.code).toBe('B737-MAX')
      })
    })

    describe('on reconstruction', () => {
      it('should recreate an aircraft model with valid properties', () => {
        const model = AircraftModelBuilder.aModel().build()

        expect(model).toBeInstanceOf(AircraftModel)
        expect(model).toHaveProperty('id')
        expect(model).toHaveProperty('name')
        expect(model).toHaveProperty('code')
        expect(model).toHaveProperty('manufacturer')
        expect(model).toHaveProperty('passengerCapacity')
        expect(model).toHaveProperty('numEngines')
      })
    })

    describe('on removal', () => {
      it('should not allow removing a model if it has associated aircraft', () => {
        fc.assert(
          fc.property(
            fc.integer({ min: 1, max: 10000 }),
            (totalAircraftCount) => {
              const model = AircraftModelMother.random()

              expect(() => model.ensureCanBeRemoved(totalAircraftCount)).toThrow('Cannot remove model with associated aircraft')
            }
          )
        )
      })

      it('should allow removal if it has no associated aircraft', () => {
        const totalAircraftCount = 0
        const model = AircraftModelMother.random()

        expect(() => model.ensureCanBeRemoved(totalAircraftCount)).not.toThrow()
      })
    })
  })
})
