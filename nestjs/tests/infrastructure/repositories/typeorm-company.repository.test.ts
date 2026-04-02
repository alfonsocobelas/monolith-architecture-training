import { v7 as uuidv7 } from 'uuid'
import { TypeOrmCompanyRepository } from 'src/modules/companies/infrastructure/typeorm/typeorm-company.repository'
import { CompanyMother } from '../../modules/companies/domain/company.mother'
import { CompanyBuilder } from '../../modules/companies/domain/company.builder'
import { moduleFixture } from '../../jest.setup.integration'

let repository: TypeOrmCompanyRepository

beforeEach(async () => {
  repository = moduleFixture.get<TypeOrmCompanyRepository>(TypeOrmCompanyRepository)
})

describe('CompanyRepository (integration tests)', () => {
  describe('register method', () => {
    it('should register a new company', async () => {
      const company = CompanyMother.random()

      await repository.register(company)
    })
  })

  describe('get method', () => {
    it('should return a company by its id', async () => {
      const company = CompanyMother.random()

      await repository.register(company)
      const foundCompany = await repository.get(company.id)

      expect(foundCompany).toEqual(company)
    })

    it('should return null if company does not exist', async () => {
      const nonExistingId = uuidv7()
      const foundCompany = await repository.get(nonExistingId)
      expect(foundCompany).toBeNull()
    })
  })

  describe('exists method', () => {
    it('should return true if a company with the given name exists', async () => {
      const company = CompanyMother.random()
      await repository.register(company)

      const exists = await repository.exists(company.name)

      expect(exists).toBe(true)
    })

    it('should return false if no company with the given name exists', async () => {
      const exists = await repository.exists('NonExistingCompanyName')

      expect(exists).toBe(false)
    })
  })

  describe('save method', () => {
    it('should update an existing company', async () => {
      const company = CompanyMother.random()

      await repository.register(company)

      // Update some properties of the company
      const updatedCompany = CompanyBuilder.aCompany().withId(company.id).withName('New Company Name').build()

      await repository.save(updatedCompany)

      const foundCompany = await repository.get(company.id)
      expect(foundCompany).toEqual(updatedCompany)
    })
  })

  describe('save method with multiple companies', () => {
    it('should update multiple existing companies', async () => {
      const company1 = CompanyMother.random()
      const company2 = CompanyMother.random()

      await repository.register(company1)
      await repository.register(company2)

      // Update some properties of the companies
      const updatedCompany1 = CompanyBuilder.aCompany().withId(company1.id).withName('Updated Company 1').build()

      const updatedCompany2 = CompanyBuilder.aCompany().withId(company2.id).withName('Updated Company 2').build()

      await repository.save([updatedCompany1, updatedCompany2])

      const foundCompany1 = await repository.get(company1.id)
      const foundCompany2 = await repository.get(company2.id)

      expect(foundCompany1).toEqual(updatedCompany1)
      expect(foundCompany2).toEqual(updatedCompany2)
    })
  })
})
