import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: CreateAuthDto) {
    // check password match
    if (dto.password !== dto.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }

    // check phone exists
    const existPhone = await this.prisma.user.findUnique({
      where: { phone: dto.phone },
    });

    if (existPhone) {
      throw new ConflictException('Phone already exists');
    }

    // check email exists
    const existEmail = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existEmail) {
      throw new ConflictException('Email already exists');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        fullname: dto.fullname,
        email: dto.email,
        phone: dto.phone,
        password: hashedPassword,
      },
    });

    return {
      message: 'User registered successfully',
      data: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
      },
    };
  }
}
