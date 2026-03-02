import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const categories = this.prisma.category.findMany({
      include: {
        products: true,
      },
    });
    return {
      Catecory: categories,
    };
  }

  async getById(id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: id,
      },
      include: {
        products: true,
      },
    });

    return {
      message: 'Category detail',
      data: category,
    };
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
