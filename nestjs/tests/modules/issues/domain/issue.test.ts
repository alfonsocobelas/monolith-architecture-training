import fc from 'fast-check'
import { normalizeString } from 'src/modules/shared/utils/normalize'
import { IssuePartCategory, IssueSeverityLevel } from 'src/modules/issues/domain/issue-enums'
import { ISSUE_CONSTRAINTS as LIMITS } from 'src/modules/issues/domain/issue-constants'
import { Issue } from 'src/modules/issues/domain/issue'
import { IssueBuilder } from './issue.builder'
import { IssueMother } from './issue.mother'

describe('Issue domain model (unit/property-based tests)', () => {

  describe('Invariants', () => {
    describe('id validation', () => {
      it('should throw error if ID is not UUID v7', () => {
        fc.assert(
          fc.property(fc.uuid({ version: 4 }), (invalidId) => {
            const builder = IssueBuilder.anIssue().withId(invalidId)

            expect(() => builder.create()).toThrow('Invalid id')
          })
        )
      })
    })

    describe('aircraftId validation', () => {
      it('should throw error if aircraftId is not UUID v7', () => {
        fc.assert(
          fc.property(fc.uuid({ version: 4 }), (invalidAircraftId) => {
            const builder = IssueBuilder.anIssue().withAircraftId(invalidAircraftId)

            expect(() => builder.create()).toThrow('Invalid aircraftId')
          })
        )
      })
    })

    describe('engineId validation', () => {
      it('should throw error if engineId is not UUID v7', () => {
        fc.assert(
          fc.property(fc.uuid({ version: 4 }), (invalidEngineId) => {
            const builder = IssueBuilder.anIssue().withEngineId(invalidEngineId)

            expect(() => builder.create()).toThrow('Invalid engineId')
          })
        )
      })
    })

    describe('code validation', () => {
      it('should fail if normalized code is empty string', () => {
        fc.assert(
          fc.property(
            fc.constantFrom('', ' ', '\t', '\n', '\r\n', '   \t\n  '),
            (invalidCode) => {
              const builder = IssueBuilder.anIssue().withCode(invalidCode)

              expect(() => builder.create()).toThrow('Code cannot be empty')
            }
          )
        )
      })

      it('should fail if normalized code is less than 2 characters', () => {
        fc.assert(
          fc.property(
            fc.string({ minLength: 1, maxLength: LIMITS.CODE.MIN_LENGTH - 1 })
              .filter(s => normalizeString(s).length > 0),
            (shortCode) => {
              const builder = IssueBuilder.anIssue().withCode(shortCode)

              expect(() => builder.create()).toThrow(`Code must be at least ${LIMITS.CODE.MIN_LENGTH} characters`)
            }
          )
        )
      })

      it('should fail if normalized code exceeds 20 characters', () => {
        fc.assert(
          fc.property(
            fc.string({ minLength: LIMITS.CODE.MAX_LENGTH + 1 })
              .filter(s => normalizeString(s).length > LIMITS.CODE.MAX_LENGTH),
            (longCode) => {
              const builder = IssueBuilder.anIssue().withCode(longCode)

              expect(() => builder.create()).toThrow(`Code must be less than or equal to ${LIMITS.CODE.MAX_LENGTH} characters`)
            }
          )
        )
      })
    })

    describe('description validation', () => {
      it('should fail if normalized description is empty string', () => {
        fc.assert(
          fc.property(
            fc.constantFrom('', ' ', '\t', '\n', '\r\n', '   \t\n  '),
            (invalidDescription) => {
              const builder = IssueBuilder.anIssue().withDescription(invalidDescription)

              expect(() => builder.create()).toThrow('Description cannot be empty')
            }
          )
        )
      })

      it('should fail if normalized description is less than 2 character', () => {
        fc.assert(
          fc.property(
            fc.string({ minLength: 0, maxLength: LIMITS.DESCRIPTION.MIN_LENGTH - 1 })
              .filter(s => normalizeString(s).length > 0),
            (shortDescription) => {
              const builder = IssueBuilder.anIssue().withDescription(shortDescription)

              expect(() => builder.create()).toThrow(`Description must be at least ${LIMITS.DESCRIPTION.MIN_LENGTH} characters`)
            }
          )
        )
      })

      it('should fail if  normalized description exceeds 500 characters', () => {
        fc.assert(
          fc.property(
            fc.string({ minLength: LIMITS.DESCRIPTION.MAX_LENGTH + 1 })
              .filter(s => normalizeString(s).length > LIMITS.DESCRIPTION.MAX_LENGTH),
            (longDescription) => {
              const builder = IssueBuilder.anIssue().withDescription(longDescription)

              expect(() => builder.create()).toThrow(`Description must be less than or equal to ${LIMITS.DESCRIPTION.MAX_LENGTH} characters`)
            }
          )
        )
      })
    })

    describe('severity validation', () => {
      it('should throw if severity is not a valid enum value', () => {
        fc.assert(
          fc.property(
            fc.string().filter(s => !(s in IssueSeverityLevel)),
            (invalidSeverity) => {
              const builder = IssueBuilder.anIssue().withSeverity(invalidSeverity as IssueSeverityLevel)

              expect(() => builder.create()).toThrow(`Invalid severity level: ${invalidSeverity}`)
            }
          )
        )
      })
    })

    describe('part category validation', () => {
      it('should throw if part category is AVIONICS but aircraftId is not provided', () => {
        const builder = IssueBuilder.anIssue().withPartCategory(IssuePartCategory.AVIONICS)

        expect(() => builder.create()).toThrow('aircraftId is required when partCategory is Aircraft')
      })

      it('should throw if part category is FUSELAGE but aircraftId is not provided', () => {
        const builder = IssueBuilder.anIssue().withPartCategory(IssuePartCategory.FUSELAGE)

        expect(() => builder.create()).toThrow('aircraftId is required when partCategory is Aircraft')
      })

      it('should throw if part category is ENGINE but engineId is not provided', () => {
        const builder = IssueBuilder.anIssue().withPartCategory(IssuePartCategory.ENGINE)

        expect(() => builder.create()).toThrow('engineId is required when partCategory is ENGINE')
      })
    })
  })

  describe('Business rules', () => {
    describe('on creation', () => {
      it('should create a valid issue', () => {
        const issue = IssueMother.engine()

        expect(issue).toBeInstanceOf(Issue)
        expect(issue).toHaveProperty('id')
        expect(issue).toHaveProperty('code')
        expect(issue).toHaveProperty('description')
        expect(issue).toHaveProperty('severity')
        expect(issue).toHaveProperty('requiresGrounding')
        expect(issue).toHaveProperty('partCategory')
        expect(issue).toHaveProperty('engineId')
        expect(issue.engineId).toBeDefined()
      })
    })
  })
})
