import { Type } from 'class-transformer'
import { Allow, IsInt, IsOptional, IsString, Max, Min } from 'class-validator'

export class PaginateCursorDto {
  @IsOptional()
  @IsString()
    cursor?: string

  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(100)
    pageSize!: number

  @Allow()
    filters?: Array<Map<string, string>>
  @Allow()
    orders?: Array<Map<string, string>>
}
