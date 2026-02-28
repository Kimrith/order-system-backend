import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  adminGet() {
    return {
      message: 'Admin checked',
    };
  }

  register(dto: CreateAuthDto) {
    return {
      message: 'User registered successfully',
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
      },
  }
}
