import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
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
        phone: dto.phone,
      },
    });

    return {
      message: 'User registered successfully',
      data: {
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
      },
    };
  }
}
