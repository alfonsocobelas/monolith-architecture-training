import fc from 'fast-check'
import { normalizeString } from 'src/modules/shared/utils/normalize'
import { Company } from 'src/modules/companies/domain/company'
import { COMPANY_CONSTRAINTS as LIMIT } from 'src/modules/companies/domain/company-constants'
import { CompanyBuilder } from './company.builder'

describe('Company domain model (unit/property-based test)', () => {

  describe('Invariants', () => {
    describe('id validation', () => {
      it('should throw error if ID is not UUID v7', () => {
        fc.assert(
          fc.property(fc.uuid({ version: 4 }), (invalidId) => {
            const builder = CompanyBuilder.aCompany().withId(invalidId)

            expect(() => builder.create()).toThrow('Invalid id')
          })
        )
      })
    })

    describe('name validation', () => {
      it('should fail if name is empty or only whitespace', () => {
        fc.assert(
          fc.property(
            fc.constantFrom('', ' ', '\t', '\n', '\r\n', '   \t\n  '),
            (invalidName) => {
              const builder = CompanyBuilder.aCompany().withName(invalidName)

              expect(() => builder.create()).toThrow('Name cannot be empty')
            }
          )
        )
      })

      it('should fail if name is less than 2 characters', () => {
        fc.assert(
          fc.property(
            fc.string({ maxLength: LIMIT.NAME.MIN_LENGTH - 1 })
              .filter(str => normalizeString(str).length > 0),
            (shortName) => {
              const builder = CompanyBuilder.aCompany().withName(shortName)

              expect(() => builder.create()).toThrow(`Name must be at least ${LIMIT.NAME.MIN_LENGTH} characters`)
            }
          )
        )
      })

      it('should fail if name is greater than 100 characters', () => {
        fc.assert(
          fc.property(
            fc.string({ minLength: LIMIT.NAME.MAX_LENGTH + 1 }),
            (longName) => {
              const builder = CompanyBuilder.aCompany().withName(longName)

              expect(() => builder.create()).toThrow(`Name must be less than or equal to ${LIMIT.NAME.MAX_LENGTH} characters`)
            }
          )
        )
      })
    })
  })

  describe('Business rules', () => {
    describe('on creation', () => {
      it('should create a company with valid properties', () => {
        const company = CompanyBuilder.aCompany().create()

        expect(company).toBeInstanceOf(Company)
        expect(company).toHaveProperty('id')
        expect(company).toHaveProperty('name')
      })
    })

    describe('on reconstruction', () => {
      it('should reconstruct a company with valid properties', () => {
        const company = CompanyBuilder.aCompany().build()

        expect(company).toBeInstanceOf(Company)
        expect(company).toHaveProperty('id')
        expect(company).toHaveProperty('name')
      })
    })
  })
})
