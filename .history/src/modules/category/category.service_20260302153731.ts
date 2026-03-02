import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService)

        async getAll() {
    return this.prisma.category.findMany({
      include: {
        products: true
      }
    });
  }


  async create(dto: CreateCategoryDto) {
    const category = await this.prisma.category.create({
      data: {
        name: dto.name,
        description: dto.description,
      },
    });

    return {
      message: 'Category created',
      data: category,
    };
  }
}
