import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserCreateDto, UserCreateResponse } from './dto/user.dto';
import { UserResponseMapper } from './user.response.mapper';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
  @ApiOperation({ summary: 'Create new user' })
  @Post('create')
  async createUser(@Body() body: UserCreateDto): Promise<UserCreateResponse> {
    const result = await this.userService.createUser(body);
    return UserResponseMapper.toDetailsDto(result);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @Get(':userId')
  async getUserById(
    @Param('userId') userId: string,
  ): Promise<UserCreateResponse> {
    const result = await this.userService.getUserById(userId);
    return UserResponseMapper.toDetailsDto(result);
  }

  @ApiOperation({ summary: 'Update user by id' })
  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() body: UserCreateDto,
  ): Promise<UserCreateResponse> {
    const result = await this.userService.updateUser(userId, body);
    return UserResponseMapper.toDetailsDto(result);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @Delete(':userId')
  async deleteUser() {}
}
