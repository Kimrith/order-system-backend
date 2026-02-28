import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  async checkAdmin() {
    const admin = await this.prisma.admin.findFirst();
    return { exists: !!admin };
  }

  register(dto: CreateAuthDto) {
    return {
      message: 'User registered successfully',
      data: dto,
    };
  }
}
