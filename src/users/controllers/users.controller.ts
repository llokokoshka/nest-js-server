import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number): Object {
    return this.usersService.getUser(id);
  }
  // @Patch()
  // updateUser(@Body() updateUserDto: UpdateUserDto): Object {
  //   return this.usersService.updateUser(updateUserDto);
  // }
  // @Delete('/:id')
  // deleteUser(@Param('id') id: string): Object {
  //   return this.usersService.deleteUser;
  // }
  // @Get()
  // getAllUsers(): Object {
  //   return this.usersService.findAll;
  // }
}
