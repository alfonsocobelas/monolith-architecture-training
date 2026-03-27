import { IsNotEmpty, IsString, IsUUID, IsInt, Min, Max, MinLength, MaxLength } from 'class-validator'
import { AIRCRAFT_MODEL_CONSTRAINTS as LIMITS } from 'src/modules/aircraft-models/domain/aircraft-model-constants'

export class AircraftModelPostSchema {
  @IsString()
  @IsNotEmpty()
  @IsUUID('7')
    id!: string

  @IsString()
  @IsNotEmpty()
  @MinLength(LIMITS.NAME.MIN_LENGTH)
  @MaxLength(LIMITS.NAME.MAX_LENGTH)
    name!: string

  @IsString()
  @IsNotEmpty()
  @MinLength(LIMITS.CODE.MIN_LENGTH)
  @MaxLength(LIMITS.CODE.MAX_LENGTH)
    code!: string

  @IsString()
  @IsNotEmpty()
  @MinLength(LIMITS.MANUFACTURER.MIN_LENGTH)
  @MaxLength(LIMITS.MANUFACTURER.MAX_LENGTH)
    manufacturer!: string

  @IsInt()
  @IsNotEmpty()
  @Min(LIMITS.PASSENGERS.MIN)
  @Max(LIMITS.PASSENGERS.MAX)
    passengerCapacity!: number

  @IsInt()
  @IsNotEmpty()
  @Min(LIMITS.ENGINES.MIN)
  @Max(LIMITS.ENGINES.MAX)
    numEngines!: number
}
