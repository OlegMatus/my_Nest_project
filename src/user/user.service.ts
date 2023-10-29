import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserCreateDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private users = [];

  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userData: UserCreateDto) {
    const userEmail = userData.email.trim();
    const findUser = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    if (findUser) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }
    try {
      const newUser = this.userRepository.create(userData);
      return await this.userRepository.save(newUser);
    } catch (e) {
      throw new HttpException('Create user failed', HttpStatus.BAD_REQUEST);
    }
  }
  async getOneUser(userId: string) {
    return this.users.find((item) => item.id === Number(userId))[0];
  }
  async getAllUsers() {
    return this.users;
  }
}
