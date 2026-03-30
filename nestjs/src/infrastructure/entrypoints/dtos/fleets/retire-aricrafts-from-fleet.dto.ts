import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class RetireAircraftsFromFleetDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID('7')
    fleetId!: string

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsUUID('7', { each: true })
    aircraftIds!: string[]
}
