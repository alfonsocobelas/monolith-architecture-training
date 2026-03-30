import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class RetireAircraftFromFleetDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID('7')
    fleetId!: string

  @IsString()
  @IsNotEmpty()
  @IsUUID('7')
    aircraftId!: string
}
