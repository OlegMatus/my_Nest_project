import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { UserCreateDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private users = [];

  constructor() {}

  async createUser(userData: UserCreateDto) {
    if (userData.age < 18) {
      throw new HttpException(
        'User is not yet 18 years old',
        HttpStatus.BAD_REQUEST,
      );
    }
    const id = uuid();
    const newUser = { id, userData };
    this.users.push(newUser);
    return this.users;
  }
  async getOneUser(userId: string) {
    return this.users.find((item) => item.id === Number(userId))[0];
  }
  async getAllUsers() {
    return this.users;
  }
}
