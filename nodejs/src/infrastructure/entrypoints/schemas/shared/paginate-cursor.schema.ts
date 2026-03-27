import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator'

export class PaginateCursorSchema {
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(100)
    pageSize!: number

  @IsOptional()
  @IsString()
    cursor?: string

  @IsOptional()
  @IsString()
    filters?: string

  @IsOptional()
  @IsString()
    orders?: string
}
