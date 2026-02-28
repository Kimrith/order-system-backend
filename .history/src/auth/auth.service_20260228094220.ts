import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  adminGet() {
    return {
      message: 'Admin checked',
    };
  }

  async register(dto: CreateAuthDto) {
    const admin = await this.prisma.admin.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: dto.password,
        phone_number: dto.phone,
      },
    });

    return {
      message: 'User registered successfully',
      data: {
        name: admin.name,
        email: admin.email,
        phone: admin.phone_number,
      },
    };
  }
}
