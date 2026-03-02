import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category name',
    example: 'Drink',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Category description',
    example: 'All beverages',
  })
  @IsString()
  description: string;
}
