import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class IdParamDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID('7')
    id!: string
}
