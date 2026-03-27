import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class IdParamSchema {
  @IsString()
  @IsNotEmpty()
  @IsUUID('7')
    id!: string
}
