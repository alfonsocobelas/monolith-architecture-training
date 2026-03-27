import { v7 as uuidv7 } from 'uuid'
import { RegisterCompanyInput } from 'src/modules/companies/application/create/register-company-input.dto'
import { COMPANY_CONSTRAINTS as LIMITS } from 'src/modules/companies/domain/company-constants'
import { randomString } from '../../../shared/utils/random-string'

export class RegisterCompanyInputMother {
  static create(overrides?: Partial<RegisterCompanyInput>): RegisterCompanyInput {
    return {
      id: uuidv7(),
      name: randomString(LIMITS.NAME.MIN_LENGTH, LIMITS.NAME.MAX_LENGTH),
      ...overrides
    }
  }

  static random(): RegisterCompanyInput {
    return this.create()
  }

  static withExistingName(name: string): RegisterCompanyInput {
    return this.create({ name })
  }
}
