import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/users/users.repository';
import { generatePassword, validPassword } from './utils/auth.utils';
import { User } from 'src/users/entity/users.entity';
import { CreateUserDto } from 'src/users/lib/createUsers.dto';
import { CreateTokensUtil } from './utils/token.utils';
import { VisibleUserParamsDto } from 'src/users/lib/visibleUserParams.dto';
import { LoginDto } from './lib/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private createTokensUtil: CreateTokensUtil,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<LoginDto> {
    const user = await this.userRepository.getUserByEmail(email);
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
      fullName: user.fullName,
      email: user.email,
      Dob: user.Dob,
    };
    const { access_token, refresh_token } =
      await this.createTokensUtil.createTokens(payload);
    return {
      user: visibleParamsOfUser,
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  async registration(
    user: CreateUserDto,
  ): Promise<{ user: User; access_token: string; refresh_token: string }> {
    const hashPass = generatePassword(user.password);
    user.password = hashPass.salt + '//' + hashPass.hash;
    const addedUserInDb = await this.userRepository.createUser(user);
    if (!addedUserInDb) {
      throw new HttpException(
        'user not addited',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const payload = { sub: addedUserInDb.id, username: addedUserInDb.fullName };
    console.log('user are addited');
    const { access_token, refresh_token } =
      await this.createTokensUtil.createTokens(payload);
    return {
      user: addedUserInDb,
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  async refreshToken(rt: string) {
    if (!rt) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(rt, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
      const user = await this.userRepository.getUserById(payload.sub);
      const data = { sub: user.id, username: user.fullName };
      const { access_token, refresh_token } =
        await this.createTokensUtil.createTokens(data);
      console.log('token are refreshed');
      return {
        user: user,
        access_token: access_token,
        refresh_token: refresh_token,
      };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
