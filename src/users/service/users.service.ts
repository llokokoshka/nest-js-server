import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/users.entity';
import { UsersUtils } from '../utils/users.utils';
import { UpdateUserDto } from '../dto/updateUser.dto';

// export type User = any;

@Injectable()
export class UsersService {
  constructor(
    private usersUtils: UsersUtils,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUser(id: number): Promise<Object> {
    const user = await this.usersUtils.findUser(id);
    if (!user) {
      throw new HttpException(
        'user not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const visibleParamsOfUser = {
      name: user.fullName,
      email: user.email,
      dateOfBirth: user.Dob,
    };
    return visibleParamsOfUser;
  }

  async findAll(): Promise<Object[]> {
    const users = await this.usersRepository.find();

    if (!users || users.length === 0) {
      throw new HttpException(
        'users not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const visibleParamsOfUsers = users.map((user) => ({
      name: user.fullName,
      email: user.email,
      dateOfBirth: user.Dob,
    }));

    return visibleParamsOfUsers;
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.usersUtils.findUser(id);
    if (!user) {
      throw new HttpException(
        'users not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.usersRepository.remove(user);
  }

  async updateUser(updateUser: UpdateUserDto, id: number): Promise<User> {
    const params: UpdateUserDto = updateUser;
    const user = await this.usersUtils.findUser(id);
    const newUser = await this.usersRepository.save({ ...user, ...params });
    console.log('user are changed');

    return newUser;
  }
}
