import { Module } from '@nestjs/common'
import { CompaniesController } from 'src/infrastructure/entrypoints/controllers/companies.controller'
import { GetCompanyUseCase } from 'src/modules/companies/application/find/get-company-usecase.service'
import { RemoveCompanyUseCase } from 'src/modules/companies/application/delete/remove-company-usecase.service'
import { RegisterCompanyUseCase } from 'src/modules/companies/application/create/register-company-usecase.service'
import { CompanyRepository } from 'src/modules/companies/domain/company.repository'
import { TypeOrmCompanyRepository } from 'src/modules/companies/infrastructure/typeorm/typeorm-company.repository'
import { GetCompanyHandler } from 'src/infrastructure/entrypoints/handlers/companies/get-company.handler'
import { RemoveCompanyHandler } from 'src/infrastructure/entrypoints/handlers/companies/remove-company.handler'
import { RegisterCompanyHandler } from 'src/infrastructure/entrypoints/handlers/companies/register-company.handler'

@Module({
  controllers: [CompaniesController],
  providers: [
    // Handlers
    RegisterCompanyHandler,
    GetCompanyHandler,
    RemoveCompanyHandler,
    // Use Cases
    RegisterCompanyUseCase,
    GetCompanyUseCase,
    RemoveCompanyUseCase,
    // Repositories
    {
      provide: CompanyRepository,
      useClass: TypeOrmCompanyRepository
    }
  ],
  exports: [CompanyRepository]
})
export class CompaniesModule {}
