import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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
    const payLoad = { sub: user._id, email: user.email };
    const access_token = await this.jwtService.signAsync(payLoad);
    return {
      message: 'User Registered Successfully!',
      access_token,
    };
  }
}
