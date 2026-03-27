import { v7 as uuidv7 } from 'uuid'
import { Company } from 'src/modules/companies/domain/company'
import { CompanyProps } from 'src/modules/companies/domain/company-types'
import { COMPANY_CONSTRAINTS as LIMITS } from 'src/modules/companies/domain/company-constants'
import { randomString } from '../../shared/utils/random-string'

/**
 * IMPORTANT: In integration tests, be careful with fields that have uniqueness constraints.
 * You must set them manually to avoid collisions with other objects created in the database
 *  during test execution.
 */
export class CompanyBuilder {
  private props: CompanyProps = {
    id: uuidv7(),
    name: randomString(LIMITS.NAME.MIN_LENGTH, LIMITS.NAME.MAX_LENGTH)
  }

  static aCompany(): CompanyBuilder {
    return new CompanyBuilder()
  }

  withId(id: string): CompanyBuilder {
    this.props.id = id
    return this
  }

  withName(name: string): CompanyBuilder {
    this.props.name = name
    return this
  }

  withProps(overrides?: Partial<CompanyProps>): CompanyBuilder {
    this.props = { ...this.props, ...overrides }
    return this
  }

  create(): Company {
    return Company.create({
      id: this.props.id,
      name: this.props.name
    })
  }

  build(): Company {
    return Company.reconstruct(this.props)
  }
}
