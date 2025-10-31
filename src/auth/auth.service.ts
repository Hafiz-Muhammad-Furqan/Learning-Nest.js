import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(registerUserDto: RegisterUserDto) {
    const plainPassword = registerUserDto.password;
    const saltRounds = 10;
    const hash = await bcrypt.hash(plainPassword, saltRounds);

    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });
    const payLoad = { sub: user._id, email: user.email, role: user.role };
    const access_token = await this.jwtService.signAsync(payLoad);
    return {
      message: 'User Registered Successfully!',
      access_token,
    };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const payload = { sub: (user as any)._id, email: user.email , role: user.role};

    const access_token = await this.jwtService.signAsync(payload);
    return {
      message: 'Login Successful!',
      access_token,
    };
  }
}
