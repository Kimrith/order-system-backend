import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('users')
  @ApiOperation({ summary: 'Register new user' })
  getUser() {
    return this.authService.getUsers();
  }

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  register(@Body() dto: CreateAuthDto) {
    return this.authService.register(dto);
  }
}
