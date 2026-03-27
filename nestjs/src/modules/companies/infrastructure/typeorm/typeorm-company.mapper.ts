import { CompanyEntity } from './typeorm-company.entity'
import { Company } from '../../domain/company'

export const CompanyMapper = {
  toDomain(props: CompanyEntity): Company {
    return Company.reconstruct({
      id: props.id,
      name: props.name
    })
  },

  toPersistence(company: Company): CompanyEntity {
    const entity = new CompanyEntity()
    entity.id = company.id
    entity.name = company.name

    return entity
  }
}
