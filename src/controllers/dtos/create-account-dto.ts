import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateAccountBody {
  @IsString()
  @IsNotEmpty()
  name: string = ''

  @IsEmail()
  email: string = ''

  @IsString()
  @MinLength(6)
  password: string = ''
}
