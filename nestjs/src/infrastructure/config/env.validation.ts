import { plainToInstance, Type } from 'class-transformer'
import { IsString, IsNumber, IsBoolean, ValidateNested, validateSync } from 'class-validator'

class TypeOrmValidator {
  @IsString()
    host!: string
  @IsNumber()
    port!: number
  @IsString()
    username!: string
  @IsString()
    password!: string
  @IsString()
    database!: string
  @IsBoolean()
    synchronize!: boolean
  @IsBoolean()
    dropSchema!: boolean
  @IsBoolean()
    logging!: boolean
  @IsBoolean()
    migrationsRun!: boolean
}

class RootValidator {
  @IsString()
    env!: string
  @IsNumber()
    port!: number
  @ValidateNested() @Type(() => TypeOrmValidator)
    typeorm!: TypeOrmValidator
}

export function validate(config: Record<string, unknown>): RootValidator {
  const validatedConfig = plainToInstance(RootValidator, config)
  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length) {
    throw new Error(`Config validation failed: ${errors.toString()}`)
  }

  return validatedConfig
}
