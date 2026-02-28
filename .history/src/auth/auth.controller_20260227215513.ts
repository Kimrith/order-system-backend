import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Get('register')
  @ApiOperation({ summary: 'Check if admin already exists' })
  getRegister(@)

  @Post('register')
  @ApiOperation({ summary: 'Register Admin' })
  register(@Body() dto: CreateAuthDto) {
    return this.authService.register(dto);
  }
}
