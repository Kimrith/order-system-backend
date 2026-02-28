import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new admin' })
  register(@Body() dto: CreateAuthDto) {
    return this.authService.register(dto);
  }

  @Get('admins')
  @ApiOperation({ summary: 'Get all admins' })
  getAdmins() {
    return this.authService.getAdmins();
  }
}
