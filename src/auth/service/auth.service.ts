import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/users/users.repository';
import { generatePassword, validPassword } from '../utils/auth.utils';
import { User } from 'src/users/entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/lib/createUsers.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersUtils: UserRepository,
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ user: Object; token: string }> {
    const user = await this.usersUtils.findUser(email);
    if (!user) {
      throw new HttpException(
        'user not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const [salt, userHashPassword] = user.password.split('//');
    const isPasswordValid = validPassword(password, userHashPassword, salt);

    if (isPasswordValid == false) {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }

    const payload = { sub: user.id, username: user.fullName };
    const visibleParamsOfUser = {
      name: user.fullName,
      email: user.email,
      dateOfBirth: user.Dob,
    };
    return {
      user: visibleParamsOfUser,
      token: await this.jwtService.signAsync(payload),
    };
  }

  async registration(
    user: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    const hashPass = generatePassword(user.password);
    user.password = hashPass.salt + '//' + hashPass.hash;
    const addedUserInDb = await this.usersRepository.save(user);
    if (!addedUserInDb) {
      throw new HttpException(
        'user not addited',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const payload = { sub: addedUserInDb.id, username: addedUserInDb.fullName };
    console.log('user are addited');
    return {
      user: addedUserInDb,
      token: await this.jwtService.signAsync(payload),
    };
  }
}
