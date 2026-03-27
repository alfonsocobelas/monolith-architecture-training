import { IsNotEmpty, IsString, IsUUID, Max, MaxLength, Min, MinLength } from 'class-validator'
import { FLEET_CONSTRAINTS as LIMIT } from 'src/modules/fleets/domain/fleet-constants'

export class FleetPostSchema {
  @IsString()
  @IsNotEmpty()
  @IsUUID('7')
    id!: string

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsUUID('7', { each: true })
    aircraftIds!: string[]

  @IsString()
  @IsNotEmpty()
  @IsUUID('7')
    companyId!: string

  @IsString()
  @IsNotEmpty()
  @MinLength(LIMIT.NAME.MIN_LENGTH)
  @MaxLength(LIMIT.NAME.MAX_LENGTH)
    name!: string

  @IsString()
  @IsNotEmpty()
    operationRegion!: string

  @IsString()
  @IsNotEmpty()
    type!: string

  @IsNotEmpty()
  @Min(LIMIT.MAINTENANCE_BUDGET.MIN)
  @Max(LIMIT.MAINTENANCE_BUDGET.MAX)
    maintenanceBudget!: number
}
