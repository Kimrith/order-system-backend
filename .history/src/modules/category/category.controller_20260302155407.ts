import {
  Controller,
  Post,
  Body,
  Get,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Get all categories' })
  @Get('category')
  getAll() {
    return this.categoryService.getAll();
  }

  @ApiOperation({ summary: 'Create category' })
  @Post('category')
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Get('catecory:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getById(id);
  }
}
