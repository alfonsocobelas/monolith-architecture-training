import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { GetCompanyHandler } from '../handlers/companies/get-company.handler'
import { RegisterCompanyHandler } from '../handlers/companies/register-company.handler'
import { RemoveCompanyHandler } from '../handlers/companies/remove-company.handler'
import { RegisterCompanyDto } from '../dtos/companies/register-company.dto'
import { ParseUUIDv7Pipe } from '../pipes/parse-uuid-v7.pipe'

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly registerCompanyHandler: RegisterCompanyHandler,
    private readonly getCompanyHandler: GetCompanyHandler,
    private readonly removeCompanyHandler: RemoveCompanyHandler
  ) {}

  @Post()
  register(@Body() body: RegisterCompanyDto) {
    return this.registerCompanyHandler.run(body)
  }

  @Get(':id')
  get(@Param('id', ParseUUIDv7Pipe) id: string) {
    return this.getCompanyHandler.run(id)
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDv7Pipe) id: string) {
    return this.removeCompanyHandler.run(id)
  }
}
