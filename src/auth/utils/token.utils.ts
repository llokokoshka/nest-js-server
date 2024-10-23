import { Global, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadForTokensDto } from '../lib/payloadForTokens.dto';
import { TokensDto } from '../lib/tokens.dto';

@Global()
@Injectable()
export class CreateTokensUtil {
  constructor(private jwtService: JwtService) {}
  async createTokens(payload: PayloadForTokensDto): Promise<TokensDto> {
    const [access_token, refresh_token]: [string, string] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.TOKEN_SECRET,
        expiresIn: '10s',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '6d',
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }
}
