import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { bcrypt } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }
  async registerUser(registerUserDto: RegisterUserDto) {
    const plainPassword = registerUserDto.password;
    const saltRounds = 10;
    const hash = await bcrypt.hash(plainPassword, saltRounds);

    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });
    console.log(user);
    return {
      message: "User Registered Successfully!"
    };
  }
}
