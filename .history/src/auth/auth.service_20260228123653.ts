import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async getAdmins() {
    const admins = await this.prisma.admin.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone_number: true,
      },
    });

    return {
      message: 'Admin list',
      data: admins.map((a) => ({
        ...a,
        phone_number: a.phone_number.toString(), // ✅ FIX
      })),
    };
  }
  async register(dto: CreateAuthDto) {
    try {
      const admin = await this.prisma.admin.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: dto.password,
          phone_number: BigInt(dto.phone),
        },
      });

      return {
        message: 'User registered successfully',
        data: {
          name: admin.name,
          email: admin.email,
          phone: admin.phone_number.toString(), // ✅ FIX
        },
      };
    } catch (err) {
      return {
        message: `Error: ${err.message}`,
      };
    }
  }
}
