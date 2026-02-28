import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('register')
  @ApiOperation({})
  adminGet() {
    return this.authService.adminGet();
  }

  @Post('register')
  @ApiOperation({})
  register(@Body() dto: CreateAuthDto) {
    return this.authService.register(dto);
  }
}
