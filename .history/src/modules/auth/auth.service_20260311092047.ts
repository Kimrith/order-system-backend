import {
  Injectable,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        fullname: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });
    return {
      message: 'User List',
      data: users,
    };
  }

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

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      message: 'Login success',
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);

      const newAccessToken = this.jwtService.sign(
        {
          sub: payload.sub,
          email: payload.email,
          role: payload.role,
        },
        { expiresIn: '7d' },
      );

      return {
        access_token: newAccessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
