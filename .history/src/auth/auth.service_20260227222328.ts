import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  register(dto: CreateAuthDto) {
    return {
      message: 'User registered successfully',
      data: dto,
    };
  }
}
