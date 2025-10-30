import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const createdUser = this.authService.registerUser(registerUserDto);
    return createdUser;
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await this.authService.loginUser(loginUserDto);
      return user;
    } catch (error) {
      return { message: error.message };
    }
  }
}
