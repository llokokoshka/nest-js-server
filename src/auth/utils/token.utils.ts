import { Global, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Global()
@Injectable()
export class CreateTokensUtil {
  constructor(private jwtService: JwtService) {}
  async createTokens(
    payload:Object,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken]: [string, string] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.TOKEN_SECRET,
        expiresIn: '5s',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '6d',
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
