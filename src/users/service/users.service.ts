import { Injectable, Res, Req, Param, ParseIntPipe,   HttpException,
  HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../db/entity/users.entity';
import { Response, Request } from 'express';
import { UsersUtils } from '../utils/users.utils';
import { handleError } from 'src/error.utils';

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
      // res.json(visibleParamsOfUser);
  }

  // async findAll(@Res() res: Response): Promise<User[]> {
  //   const users = await this.usersRepository.find();

  //   if (!users || users.length === 0) {
  //     res.status(404).send('Users not found');
  //     return;
  //   }

  //   const visibleParamsOfUsers = users.map((user) => ({
  //     name: user.fullName,
  //     email: user.email,
  //     dateOfBirth: user.Dob,
  //   }));

  //   res.json(visibleParamsOfUsers);
  // }

  // async updateUser(req: Request, res: Response): Promise<void> {
  //   if (!req.body) {
  //     res.sendStatus(400);
  //     return;
  //   }
  //   const params: Partial<User> = req.body;
  //   try {
  //     const user = req.user;
  //     const newUser = await this.usersRepository.save({ ...user, ...params });

  //     console.log('user are changed');
  //     res.json(newUser);
  //   } catch (err) {
  //     handleError(res, err, 'Error while update user');
  //   }
  // }

  // async deleteUser(req: Request, res: Response): Promise<void> {
  //   try {
  //     const userId = Number(req.params.id);
  //     const user = await this.usersUtils.findUser(userId);
  //     if (!user) {
  //       res.status(404).send('User not found');
  //       return;
  //     }

  //     await this.usersRepository.remove(user);
  //     res.status(204).send();
  //   } catch (err) {
  //     handleError(res, err, 'Error while delete user');
  //   }
  // }
}
