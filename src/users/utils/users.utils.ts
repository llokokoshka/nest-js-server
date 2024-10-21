import { User } from '../entity/users.entity';
import { generatePassword } from './authUtils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersUtils {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findUser(id: number): Promise<User> {
    return await this.usersRepository.findOneBy({ id: id });
  }

  async addUserInDb(userFromDb: User, newUserInfo: User) {
    for (let key in newUserInfo) {
      if (key === 'fullName') userFromDb.fullName = newUserInfo.fullName;
      if (key === 'email') userFromDb.email = newUserInfo.email;
      if (key === 'Dob') userFromDb.Dob = newUserInfo.Dob;
      if (key === 'password') {
        const hashPass = generatePassword(newUserInfo.password);
        userFromDb.password = hashPass.salt + '//' + hashPass.hash;
      }
    }

    return userFromDb;
  }
}
