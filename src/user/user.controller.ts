import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserCreateDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/list')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get('/:userId')
  async getById(@Param() param: { userId: string }) {
    return await this.userService.getOneUser(param.userId);
  }

  @Post('create')
  async createUser(@Body() body: UserCreateDto, @Res() res: any) {
    console.log(22);
    // return await this.userService.createUser(body);
    return res
      .status(HttpStatus.CREATED)
      .json(await this.userService.createUser(body));
  }

  @Patch('/:userId')
  async updateUser() {}

  @Delete('/:userId')
  async deleteUser() {}
}
