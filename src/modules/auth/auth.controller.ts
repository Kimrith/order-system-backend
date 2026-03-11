import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtGuard } from 'src/config/jwt.guard';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth('access-token') // 👈 ADD THIS
  @Get('users')
  @UseGuards(JwtGuard)
  getUser() {
    return this.authService.getUsers();
  }

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  register(@Body() dto: CreateAuthDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  refresh(@Body('refresh_token') token: string) {
    return this.authService.refreshToken(token);
  }
}
