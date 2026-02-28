import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  async adminGet() {
    const admin = await this.prisma.admin.findFirst({
      select: {
        email: true,
        name: true,
        phone: true, // match your schema field
      },
    });

    return admin;
  }

  register(dto: CreateAuthDto) {
    return {
      message: 'User registered successfully',
      data: dto,
    };
  }
}
