import fc from 'fast-check'
import { v7 as uuidv7 } from 'uuid'
import { normalizeString } from 'src/modules/shared/utils/normalize'
import { Aircraft } from 'src/modules/aircrafts/domain/aircraft'
import { AircraftStatus } from 'src/modules/aircrafts/domain/aircraft-enums'
import { AIRCRAFT_CONSTRAINTS as LIMITS } from 'src/modules/aircrafts/domain/aircraft-constants'
import { AircraftBuilder } from './aircraft.builder'

describe('Aircraft domain model (unit/property-based test)', () => {
  describe('Invariants', () => {
    describe('id validation', () => {
      it('should throw error if ID is not UUID v7', () => {
        fc.assert(
          fc.property(fc.uuid({ version: 4 }), invalidId => {
            const builder = AircraftBuilder.anAircraft().withId(invalidId)

            expect(() => builder.create()).toThrow('Invalid id')
          })
        )
      })
    })

    describe('modelId validation', () => {
      it('should throw error if model ID is not UUID v7', () => {
        fc.assert(
          fc.property(fc.uuid({ version: 4 }), invalidModelId => {
            const builder = AircraftBuilder.anAircraft().withModelId(invalidModelId)

            expect(() => builder.create()).toThrow('Invalid modelId')
          })
        )
      })
    })

    describe('tail number validation', () => {
      it('should fail if normalize tail number is invalid', () => {
        fc.assert(
          fc.property(fc.constantFrom('', ' ', '\t', '\n', '\r\n', '   \t\n  '), invalidTailNumber => {
            const builder = AircraftBuilder.anAircraft().withTailNumber(invalidTailNumber)

            expect(() => builder.create()).toThrow('Tail number cannot be empty')
          })
        )
      })

      it('should fail is normalized tail number is less than 5 characters', () => {
        fc.assert(
          fc.property(
            fc
              .string({ minLength: 1, maxLength: LIMITS.TAIL_NUMBER.MIN_LENGTH - 1 })
              .filter(str => normalizeString(str).length > 0),
            shortTailNumber => {
              const builder = AircraftBuilder.anAircraft().withTailNumber(shortTailNumber)

              expect(() => builder.create()).toThrow(
                `Tail number must be at least ${LIMITS.TAIL_NUMBER.MIN_LENGTH} characters`
              )
            }
          )
        )
      })

      it('should fail if normalized tail number exceeds 20 characters', () => {
        fc.assert(
          fc.property(
            fc
              .string({ minLength: LIMITS.TAIL_NUMBER.MAX_LENGTH + 1 })
              .filter(str => normalizeString(str).length > LIMITS.TAIL_NUMBER.MAX_LENGTH),
            longTailNumber => {
              const builder = AircraftBuilder.anAircraft().withTailNumber(longTailNumber)

              expect(() => builder.create()).toThrow(
                `Tail number must be less than or equal to ${LIMITS.TAIL_NUMBER.MAX_LENGTH} characters`
              )
            }
          )
        )
      })
    })

    describe('fuel validation', () => {
      it('should fail if fuel percentage is not an integer', () => {
        fc.assert(
          fc.property(
            fc
              .double({ min: LIMITS.FUEL_LEVEL.MIN, max: LIMITS.FUEL_LEVEL.MAX, noNaN: true })
              .filter(num => !Number.isInteger(num)),
            invalidLevel => {
              const aircraft = AircraftBuilder.anAircraft().build()

              expect(() => {
                aircraft.fuelLevelPercentage = invalidLevel
              }).toThrow('Fuel level percentage must be an integer')
            }
          )
        )
      })

      it('should fail if fuel percentage is less than 0', () => {
        fc.assert(
          fc.property(fc.integer({ max: LIMITS.FUEL_LEVEL.MIN - 1 }), invalidFuel => {
            const aircraft = AircraftBuilder.anAircraft().build()

            expect(() => {
              aircraft.fuelLevelPercentage = invalidFuel
            }).toThrow(`Fuel level percentage must be greater than or equal to ${LIMITS.FUEL_LEVEL.MIN}.`)
          })
        )
      })

      it('should fail if fuel percentage is greater than 100', () => {
        fc.assert(
          fc.property(fc.integer({ min: LIMITS.FUEL_LEVEL.MAX + 1 }), invalidFuel => {
            const aircraft = AircraftBuilder.anAircraft().build()

            expect(() => {
              aircraft.fuelLevelPercentage = invalidFuel
            }).toThrow(`Fuel level percentage must be less than or equal to ${LIMITS.FUEL_LEVEL.MAX}.`)
          })
        )
      })
    })

    describe('flight hours validation', () => {
      it('should fail if flight hours is not an integer', () => {
        fc.assert(
          fc.property(
            fc
              .double({ min: LIMITS.FLIGHT_HOURS.MIN, max: LIMITS.FLIGHT_HOURS.MAX, noNaN: true })
              .filter(num => !Number.isInteger(num)),
            invalidHours => {
              const aircraft = AircraftBuilder.anAircraft().build()

              expect(() => {
                aircraft.totalFlightHours = invalidHours
              }).toThrow('Total flight hours must be an integer')
            }
          )
        )
      })

      it('should fail if flight hours is less than 0', () => {
        fc.assert(
          fc.property(fc.integer({ max: LIMITS.FLIGHT_HOURS.MIN - 1 }), invalidHours => {
            const aircraft = AircraftBuilder.anAircraft().build()

            expect(() => {
              aircraft.totalFlightHours = invalidHours
            }).toThrow(`Total flight hours must be greater than or equal to ${LIMITS.FLIGHT_HOURS.MIN}.`)
          })
        )
      })

      it('should fail if flight hours is greater than 10000', () => {
        fc.assert(
          fc.property(fc.integer({ min: LIMITS.FLIGHT_HOURS.MAX + 1 }), invalidHours => {
            const aircraft = AircraftBuilder.anAircraft().build()

            expect(() => {
              aircraft.totalFlightHours = invalidHours
            }).toThrow(`Total flight hours must be less than or equal to ${LIMITS.FLIGHT_HOURS.MAX}.`)
          })
        )
      })
    })

    describe('status validation', () => {
      it('should throw if status is not a valid enum value', () => {
        fc.assert(
          fc.property(fc.string(), invalidStatus => {
            const aircraft = AircraftBuilder.anAircraft().build()

            expect(() => {
              aircraft.status = invalidStatus as AircraftStatus
            }).toThrow(`Invalid aircraft status: ${invalidStatus}`)
          })
        )
      })
    })
  })

  describe('Business rules', () => {
    describe('on creation', () => {
      it('should create a valid aircraft with default properties', () => {
        const aircraft = AircraftBuilder.anAircraft().create()

        expect(aircraft).toBeInstanceOf(Aircraft)
        expect(aircraft).toHaveProperty('id')
        expect(aircraft).toHaveProperty('modelId')
        expect(aircraft).toHaveProperty('tailNumber')
        expect(aircraft).toHaveProperty('isActive')
        expect(aircraft).toHaveProperty('engineIds')
        expect(aircraft).toHaveProperty('totalFlightHours')
        expect(aircraft).toHaveProperty('fuelLevelPercentage')
        expect(aircraft).toHaveProperty('status')
        expect(aircraft.fleetId).toBeUndefined()
        expect(aircraft.engineIds).toEqual([])
        expect(aircraft.isActive).toBe(false)
        expect(aircraft.status).toBe(AircraftStatus.DRAFT)
        expect(aircraft.totalFlightHours).toBe(LIMITS.FLIGHT_HOURS.MIN)
        expect(aircraft.fuelLevelPercentage).toBe(LIMITS.FUEL_LEVEL.MIN)
      })

      it('should normalize tail number when creating a new aircraft', () => {
        const aircraft = AircraftBuilder.anAircraft().withTailNumber('  ec-lxy  ').create()

        expect(aircraft.tailNumber).toBe('EC-LXY')
      })
    })

    describe('on reconstruction', () => {
      it('should reconstruct a valid aircraft with given properties', () => {
        const aircraft = AircraftBuilder.anAircraft().build()

        expect(aircraft).toBeInstanceOf(Aircraft)
        expect(aircraft).toHaveProperty('id')
        expect(aircraft).toHaveProperty('modelId')
        expect(aircraft).toHaveProperty('tailNumber')
        expect(aircraft).toHaveProperty('isActive')
        expect(aircraft).toHaveProperty('engineIds')
        expect(aircraft).toHaveProperty('totalFlightHours')
        expect(aircraft).toHaveProperty('fuelLevelPercentage')
        expect(aircraft).toHaveProperty('status')
      })
    })

    describe('on engine installation', () => {
      it('should not allow installing engines if status is DRAFT', () => {
        const aircraft = AircraftBuilder.anAircraft().build()
        const engineId = uuidv7()
        const numEngines = 1

        expect(() => aircraft.installEngine(engineId, numEngines)).toThrow(
          'Engines can only be installed on active or in-maintenance aircraft'
        )
      })

      it('should allow installation in MAINTENANCE status', () => {
        const aircraft = AircraftBuilder.anAircraft().withStatus(AircraftStatus.MAINTENANCE).build()

        const engineId = uuidv7()
        aircraft.installEngine(engineId, 2)

        expect(aircraft.engineIds).toContain(engineId)
      })

      it('should throw error if installing more engines than allowed', () => {
        const engineId1 = uuidv7()
        const engineId2 = uuidv7()
        const numEngines = 1

        const aircraft = AircraftBuilder.anAircraft()
          .withStatus(AircraftStatus.MAINTENANCE)
          .withEngineIds([engineId1])
          .build()

        expect(() => aircraft.installEngine(engineId2, numEngines)).toThrow(
          'Cannot install more engines than the model allows'
        )
      })
    })

    describe('on fleet assignment', () => {
      it('should add aircraft to fleet if not already assigned', () => {
        const aircraft = AircraftBuilder.anAircraft().build()
        const fleetId = uuidv7()

        aircraft.addToFleet(fleetId)

        expect(aircraft.fleetId).toBe(fleetId)
      })

      it('should throw error if adding to fleet when already assigned', () => {
        const fleetId1 = uuidv7()
        const fleetId2 = uuidv7()

        const aircraft = AircraftBuilder.anAircraft().withFleetId(fleetId1).build()

        expect(() => aircraft.addToFleet(fleetId2)).toThrow(`Aircraft is already assigned to fleet ${fleetId1}.`)
      })
    })
  })
})
