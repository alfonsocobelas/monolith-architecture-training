import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class RemoveEngineFromAircraftDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID('7')
    engineId!: string

  @IsString()
  @IsNotEmpty()
  @IsUUID('7')
    aircraftId!: string
}
