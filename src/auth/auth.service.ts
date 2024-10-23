import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/users/users.repository';
import { generatePassword, validPassword } from './utils/auth.utils';
import { User } from 'src/users/entity/users.entity';
import { CreateUserDto } from 'src/users/lib/createUsers.dto';
import { CreateTokensUtil } from './utils/token.utils';

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
  ): Promise<{ user: Object; access_token: string; refresh_token: string}> {
    const user = await this.userRepository.findUser(email);
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
    const { accessToken, refreshToken } = await this.createTokensUtil.createTokens(payload);
    return {
      user: visibleParamsOfUser,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async registration(
    user: CreateUserDto,
  ): Promise<{ user: User; access_token: string; refresh_token: string }> {
    const hashPass = generatePassword(user.password);
    user.password = hashPass.salt + '//' + hashPass.hash;
    const addedUserInDb = await this.userRepository.addUserInDb(user);
    if (!addedUserInDb) {
      throw new HttpException(
        'user not addited',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const payload = { sub: addedUserInDb.id, username: addedUserInDb.fullName };
    console.log('user are addited');
    const { accessToken, refreshToken } = await this.createTokensUtil.createTokens(payload);
    return {
      user: addedUserInDb,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(rt:string) {
    if (!rt) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(rt, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
      const user = await this.userRepository.findUser(payload.sub);
      const data = { sub: user.id, username: user.fullName };
      console.log('token are refreshed');
      const { accessToken, refreshToken } = await this.createTokensUtil.createTokens(data);
      return {
        user: user,
        access_token: accessToken,
        refresh_token: refreshToken,
      };
      
    } catch {
      throw new UnauthorizedException();
    }
  }

  
}
