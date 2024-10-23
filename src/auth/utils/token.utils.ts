import { Global, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadForTokensDto } from '../lib/payloadForTokens.dto';
import { TokensDto } from '../lib/tokens.dto';

import { ConfigService } from '@nestjs/config';

@Global()
@Injectable()
export class CreateTokensUtil {
  constructor(private jwtService: JwtService,
    private configService: ConfigService
  ) {}
  async createTokens(payload: PayloadForTokensDto): Promise<TokensDto> {
    const [access_token, refresh_token]: [string, string] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('token.accessToken'),
        expiresIn: '10s',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('token.refreshToken'),
        expiresIn: '6d',
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }
}
