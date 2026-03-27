import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator'

export class PaginateOffsetSchema {
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(100)
    pageSize!: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
    page?: number

  @IsOptional()
  @IsString()
    filters?: string

  @IsOptional()
  @IsString()
    orders?: string
}
