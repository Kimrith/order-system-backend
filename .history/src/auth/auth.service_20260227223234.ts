import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  get(dto: CreateAuthDto) {
    return {
      email: dto.email,
      phone: dto.phone,
    };
  }

  register(dto: CreateAuthDto) {
    return {
      message: 'User registered successfully',
      data: dto,
    };
  }
}
