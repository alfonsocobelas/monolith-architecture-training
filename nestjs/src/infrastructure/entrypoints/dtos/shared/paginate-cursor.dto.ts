import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator'

export class PaginateCursorDto {
  @IsOptional()
  @IsString()
    cursor?: string

  @IsInt()
  @Type(() => Number) //todo: creo que este decorador no funciona por que al controlador no llega esta conversion
  @Min(1)
  @Max(100)
    pageSize!: number

  @IsOptional()
  @IsString()
    filters?: string

  @IsOptional()
  @IsString()
    orders?: string
}
