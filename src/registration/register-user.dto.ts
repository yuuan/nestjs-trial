import {
  IsString,
  IsEmail,
  MaxLength,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(200)
  readonly email: string;

  @IsString()
  @MaxLength(50)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  readonly password: string;
}
