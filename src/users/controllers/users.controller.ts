import { Controller, Get, Patch, Delete, Param } from '@nestjs/common';
import { UsersService } from '../service/users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: string): Object {
    return this.usersService.getUser(id);
  }
  @Patch()
  updateUser(): Object {
    return 'abstract';
  }
  @Delete('/:id')
  deleteUser(@Param('id') id: string): Object {
    return 'abstract';
  }
  @Get()
  getAllUsers(): Object {
    return 'abstract';
  }
}
