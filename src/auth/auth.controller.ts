import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { DeleteAuthDto } from './dto/DeleteAuthDto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateAuthDto) {
    return this.authService.register(dto);
  }

  @Get('admins')
  getAdmins() {
    return this.authService.getAdmins();
  }

  @Delete('delete')
  delete(@Body() dto: DeleteAuthDto) {
    return this.authService.deleteAccount(dto);
  }
}
