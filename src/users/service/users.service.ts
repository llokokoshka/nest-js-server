import { Injectable, Res, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/users.entity';
import { Response, Request } from 'express';
import { UsersUtils } from '../utils/users.utils';

// export type User = any;

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private userUtils:Repository<User>,
      ) {}

     async findAll(@Res() res: Response): Promise<User[]> {
        const users = await this.usersRepository.find();

        if (!users || users.length === 0) {
          res.status(404).send("Users not found");
          return;
        }
    
        const visibleParamsOfUsers = users.map(user => (
          {
            name: user.fullName,
            email: user.email,
            dateOfBirth: user.Dob
          }));
    
        res.json(visibleParamsOfUsers);
      }
    
     async findOne(@Req() req: Request, @Res() res: Response): Promise<User | null> {
      if (!req.body) {
        res.sendStatus(400);
        return;
      }
    
      try {
        const userId = Number(req.params.id);
        const user = await UsersUtils.findUser(userId);
        if (!user) {
          res.status(404).send("User not found");
          return;
        }
    
        const visibleParamsOfUser = {
          name: user.fullName,
          email: user.email,
          dateOfBirth: user.Dob
        }
        console.log(visibleParamsOfUser);
        res.json(visibleParamsOfUser);
    
      }
      catch (err) {
        handleError(res, err, "Error while get user");
      }
      }
    
      async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
      }

      
}
