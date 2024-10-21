import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
// import {}

// export async function generateAccessToken(user: Object) {
//   const payload = { sub: user.id, username: user.fullName };

//   return {
//     user: user,
//     access_token: await this.jwtService.signAsync(payload),
//   };
// }

export function generatePassword(password: string) {
  const salt = crypto.randomBytes(32).toString('hex');
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return {
    salt: salt,
    hash: genHash,
  };
}

export function validPassword(password: string, hash: string, salt: string) {
  const checkHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return hash === checkHash;
}
