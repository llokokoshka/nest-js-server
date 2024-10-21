import { User } from '../../db/entity/users.entity';
import { generatePassword } from '../../auth/utils/auth.utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersUtils {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findUser(searchValue: number | string): Promise<User> {
    if (typeof searchValue == 'number') {
      return await this.usersRepository.findOneBy({ id: searchValue });
    } else {
      return await this.usersRepository.findOneBy({ email: searchValue });
    }
  }
}
