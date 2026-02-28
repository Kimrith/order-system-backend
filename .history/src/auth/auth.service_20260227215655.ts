import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async checkAdmin() {
    const admin = await this.prisma.admin.findFirst();
    return { exists: !!admin };
  }

  async register(dto: CreateAuthDto) {
    const exists = await this.prisma.admin.findFirst();

    if (exists) {
      throw new Error('Admin already exists');
    }

    return this.prisma.admin.create({
      data: {
        email: dto.email,
        password: dto.password,
        phone: dto.phone_number,
        name: 'Admin',
      },
    });
  }
}
