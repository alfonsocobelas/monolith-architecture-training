import { IsNotEmpty, IsOptional, IsString, IsUUID, IsEnum, IsBoolean, MinLength, MaxLength } from 'class-validator'
import { IssuePartCategory, IssueSeverityLevel } from 'src/modules/issues/domain/issue-enums'
import { ISSUE_CONSTRAINTS as LIMITS } from 'src/modules/issues/domain/issue-constants'

export class RegisterIssueDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID('7')
    id!: string

  @IsString()
  @IsOptional()
  @IsUUID('7')
    aircraftId?: string

  @IsString()
  @IsOptional()
  @IsUUID('7')
    engineId?: string

  @IsString()
  @IsNotEmpty()
  @MinLength(LIMITS.CODE.MIN_LENGTH)
  @MaxLength(LIMITS.CODE.MAX_LENGTH)
    code!: string

  @IsString()
  @IsNotEmpty()
  @MinLength(LIMITS.DESCRIPTION.MIN_LENGTH)
  @MaxLength(LIMITS.DESCRIPTION.MAX_LENGTH)
    description!: string

  @IsEnum(IssueSeverityLevel)
  @IsNotEmpty()
    severity!: IssueSeverityLevel

  @IsBoolean()
  @IsNotEmpty()
    requiresGrounding!: boolean

  @IsEnum(IssuePartCategory)
  @IsNotEmpty()
    partCategory!: IssuePartCategory
}
