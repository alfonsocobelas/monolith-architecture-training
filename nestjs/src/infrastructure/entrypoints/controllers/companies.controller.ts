import { Body, Controller, Delete, Get, Post } from '@nestjs/common'
import { GetCompanyHandler } from '../handlers/companies/get-company.handler'
import { RegisterCompanyHandler } from '../handlers/companies/register-company.handler'
import { IdParamDto } from '../dtos/shared/id-param.dto'
import { RegisterCompanyDto } from '../dtos/companies/register-company.dto'

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly registerCompanyHandler: RegisterCompanyHandler,
    private readonly getCompanyHandler: GetCompanyHandler,
    private readonly removeCompanyHandler: GetCompanyHandler
  ) {}

  @Post()
  register(@Body() body: RegisterCompanyDto) {
    return this.registerCompanyHandler.run(body)
  }

  @Get(':id')
  get(@Body('id') id: IdParamDto) {
    return this.getCompanyHandler.run(id)
  }

  @Delete(':id')
  remove(@Body('id') id: IdParamDto) {
    return this.removeCompanyHandler.run(id)
  }
}
