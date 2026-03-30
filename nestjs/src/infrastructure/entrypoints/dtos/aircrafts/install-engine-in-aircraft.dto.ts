import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class InstallEngineInAircraftDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID('7')
    engineId!: string

  @IsString()
  @IsNotEmpty()
  @IsUUID('7')
    aircraftId!: string
}
