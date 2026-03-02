import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteAuthDto {
  @ApiProperty()
  @IsInt()
  id: number;
}
