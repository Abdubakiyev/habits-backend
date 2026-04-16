import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Foydalanuvchi ro‘yxatdan o‘tadi' })
  @ApiResponse({ status: 201, description: 'Foydalanuvchi muvaffaqiyatli yaratildi.' })
  @ApiResponse({ status: 400, description: 'Xato: noto‘g‘ri ma’lumot.' })
  register(@Body() dto: CreateUserDto) {
    return this.userService.register(dto);
  }

  @Get(':phone')
  @ApiOperation({ summary: 'Telefon raqam orqali foydalanuvchini olish' })
  @ApiParam({ name: 'phone', description: 'Foydalanuvchi telefon raqami', example: '+998901234567' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi topildi.' })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi.' })
  getByPhone(@Param('phone') phone: string) {
    return this.userService.findByPhone(phone);
  }
}