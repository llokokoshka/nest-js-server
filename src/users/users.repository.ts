import { User } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './lib/updateUser.dto';
import { CreateUserDto } from './lib/createUsers.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findUser(searchValue: number | string): Promise<User> {
    let user: Partial<User> = {};
    if (typeof searchValue == 'number') {
     return user = await this.usersRepository.findOneBy({ id: searchValue });
    } else {
     return user = await this.usersRepository.findOneBy({ email: searchValue });
    }
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async deleteUser(user: User): Promise<void> {
    await this.usersRepository.remove(user);
  }

  async updateUser(params: UpdateUserDto, id:number): Promise<User> {
    const user = await this.findUser(id);
    return await this.usersRepository.save({ ...user, ...params });
  }

  async addUserInDb(user:CreateUserDto): Promise<User>{
    return await this.usersRepository.save(user);
  }
}
