import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { GetIssueHandler } from '../handlers/issues/get-issue.handler'
import { SearchIssuesHandler } from '../handlers/issues/search-issues.handler'
import { RegisterIssueHandler } from '../handlers/issues/register-issue.handler'
import { RegisterIssueDto } from '../dtos/issues/register-issue.dto'
import { PaginateCursorDto } from '../dtos/shared/paginate-cursor.dto'
import { ParseUUIDv7Pipe } from '../pipes/parse-uuid-v7.pipe'
import { ParseCriteriaPipe } from '../pipes/parse-criteria.pipe'

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
  search(@Query(new ParseCriteriaPipe()) query: PaginateCursorDto) {
    return this.searchIssuesHandler.run(query)
  }

  @Get(':id')
  get(@Param('id', ParseUUIDv7Pipe) id: string) {
    return this.getIssueHandler.run(id)
  }
}
