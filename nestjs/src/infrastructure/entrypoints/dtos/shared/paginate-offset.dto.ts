import { Type } from 'class-transformer'
import { Allow, IsInt, Max, Min } from 'class-validator'

export class PaginateOffsetDto {
  @Type(() => Number)
  @Min(1)
  @Max(100)
    pageSize = 10

  @Type(() => Number)
  @IsInt()
  @Min(1)
    page = 1

  @Allow()
    filters?: Array<Map<string, string>>
  @Allow()
    orders?: Array<Map<string, string>>
}
