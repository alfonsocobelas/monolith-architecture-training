import { CompanyCreateProps, CompanyPrimitiveProps, CompanyProps } from 'src/modules/companies/domain/company-types'
import { Company } from 'src/modules/companies/domain/company'
import { CompanyBuilder } from './company.builder'
import { repeat } from '../../shared/utils/random-array'

export class CompanyMother {
  static fromInput(input: Partial<CompanyPrimitiveProps>): Company {
    return CompanyBuilder.aCompany()
      .withProps(input as Partial<CompanyProps>)
      .build()
  }

  static register(overrides?: Partial<CompanyCreateProps>): Company {
    return CompanyBuilder.aCompany().withProps(overrides).create()
  }

  static reconstruct(overrides?: Partial<CompanyProps>): Company {
    return CompanyBuilder.aCompany().withProps(overrides).build()
  }

  static random(): Company {
    return CompanyBuilder.aCompany().build()
  }

  static randomList(count: number = 5): Company[] {
    return repeat(() => this.random(), count)
  }

  static airbus(): Company {
    return CompanyBuilder.aCompany().withName('Airbus').build()
  }

  static boeing(): Company {
    return CompanyBuilder.aCompany().withName('Boeing').build()
  }
}
