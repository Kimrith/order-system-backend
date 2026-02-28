import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, MinLength } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  @IsInt()
  phone: number;

  @ApiProperty()
  @IsString()
  phone: string;
}
