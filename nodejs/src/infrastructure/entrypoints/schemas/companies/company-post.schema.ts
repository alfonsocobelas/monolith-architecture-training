import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator'
import { AIRCRAFT_CONSTRAINTS as LIMITS } from 'src/modules/aircrafts/domain/aircraft-constants'

export class CompanyPostSchema {
  @IsString()
  @IsNotEmpty()
  @IsUUID('7')
    id!: string

  @IsString()
  @IsNotEmpty()
  @MinLength(LIMITS.TAIL_NUMBER.MIN_LENGTH)
  @MaxLength(LIMITS.TAIL_NUMBER.MAX_LENGTH)
    name!: string
}
