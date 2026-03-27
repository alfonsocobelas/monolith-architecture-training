import { isValidUuidV7 } from 'src/modules/shared/domain/validators/validateId'
import { CompanyError } from './company-errors'
import { CompanyCreateProps, CompanyProps } from './company-types'
import { COMPANY_CONSTRAINTS as LIMITS } from './company-constants'

export class Company {
  readonly id: string
  readonly name: string

  private constructor(props: CompanyProps) {
    this.id = props.id
    this.name = props.name
  }

  static create(props: CompanyCreateProps): Company {
    this.validateId(props.id)
    this.validateName(props.name)

    return new Company(props)
  }

  static reconstruct(props: CompanyProps): Company {
    return new Company(props)
  }

  private static validateId(id: string): void {
    if (!isValidUuidV7(id)) {
      throw new CompanyError('Invalid id')
    }
  }

  private static validateName(name: string): void {
    if (!name || !name.trim().length) {
      throw new CompanyError('Name cannot be empty')
    }

    if (name.length < LIMITS.NAME.MIN_LENGTH) {
      throw new CompanyError(`Name must be at least ${LIMITS.NAME.MIN_LENGTH} characters`)
    }

    if (name.length > LIMITS.NAME.MAX_LENGTH) {
      throw new CompanyError(`Name must be less than or equal to ${LIMITS.NAME.MAX_LENGTH} characters`)
    }
  }
}
