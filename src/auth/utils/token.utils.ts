export async function createTokens(payload: Object) {
    const [accessToken, refreshToken]: [string,string] = await Promise.all([
      this.jwtService.signAsync(payload, {
        global:true,
        secret: process.env.TOKEN_SECRET,
        expiresIn: '5m',
      }),
      this.jwtService.signAsync(payload, {
        global:true,
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '6d',
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  
  export async function updateRefreshToken(userId: string, refreshToken: string) {
    await this.usersService.update(userId, {
      refreshToken: refreshToken,
    });
  }