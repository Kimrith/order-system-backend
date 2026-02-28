import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, MinLength } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsInt()
  phone_number: number;
}
