import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { GetIssueHandler } from '../handlers/issues/get-issue.handler'
import { SearchIssuesHandler } from '../handlers/issues/search-issues.handler'
import { RegisterIssueHandler } from '../handlers/issues/register-issue.handler'
import { IdParamDto } from '../dtos/shared/id-param.dto'
import { RegisterIssueDto } from '../dtos/issues/register-issue.dto'
import { PaginateCursorDto } from '../dtos/shared/paginate-cursor.dto'

@Controller('issues')
export class IssuesController {
  constructor(
    private readonly registerIssueHandler: RegisterIssueHandler,
    private readonly getIssueHandler: GetIssueHandler,
    private readonly searchIssuesHandler: SearchIssuesHandler
  ) {}

  @Post()
  register(@Body() body: RegisterIssueDto) {
    return this.registerIssueHandler.run(body)
  }

  @Get()
  search(@Param() params: PaginateCursorDto) {
    return this.searchIssuesHandler.run(params)
  }

  @Get(':id')
  get(@Param('id') id: IdParamDto) {
    return this.getIssueHandler.run(id)
  }
}
