import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator'
import { ENGINE_CONSTRAINTS as LIMITS } from 'src/modules/engines/domain/engine-constants'

export class RegisterEngineDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID('7')
    id!: string

  @IsString()
  @IsNotEmpty()
  @MinLength(LIMITS.SERIAL_NUMBER.MIN_LENGTH)
  @MaxLength(LIMITS.SERIAL_NUMBER.MAX_LENGTH)
    serialNumber!: string
}
