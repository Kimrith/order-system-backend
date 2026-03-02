import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DeleteAuthDto } from './dto/DeleteAuthDto';
import { dot } from 'node:test/reporters';

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
      // ✅ check password match
      if (dto.password !== dto.confirm_password) {
        return {
          message: 'Password does not match',
        };
      }

      const admin = await this.prisma.admin.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: dto.password,
          phone_number: BigInt(dto.phone),
          confirm_password: dto.confirm_password,
        },
      });

      return {
        message: 'User registered successfully',
        data: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          phone: admin.phone_number.toString(),
        },
      };
    } catch (err) {
      return {
        message: `Error: ${err.message}`,
      };
    }
  }

  async deleteAccount(dto: DeleteAuthDto) {
    await this.prisma.admin.delete({
      where: {
        id: dto.id,
      },
    });

    return {
      message: 'Account deleted successfully',
    };
  }
}
