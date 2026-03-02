import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsString,
  minLength,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsInt()
  phone: number;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  confirm_password: string;
}
