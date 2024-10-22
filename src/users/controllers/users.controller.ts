import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
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

  @UseGuards(AuthGuard)
  @Get()
  getAllUsers(): Object {
    return this.usersService.findAll();
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Object {
    return this.usersService.deleteUser(id);
  }

  @Patch("/:id")
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Object {
    return this.usersService.updateUser(updateUserDto, id);
  }
}
