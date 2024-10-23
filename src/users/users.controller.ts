import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
  Req
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './lib/updateUser.dto';
import { AuthGuard } from '../auth/auth.guard';
import { VisibleUserParamsDto } from './lib/visibleUserParams.dto';

@UseGuards(AuthGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
 
  @Get('me')
  getUser(@Req() req): VisibleUserParamsDto {
    return req.user;
  }

  @Get()
  getAllUsers():  Promise<VisibleUserParamsDto[]> {
    return this.usersService.findAll();
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): void {
    this.usersService.deleteUser(id);
  }

  @Patch('me')
  updateUser(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ):  Promise<VisibleUserParamsDto> {
    return this.usersService.updateUser(updateUserDto, req.user.id);
  }
}
