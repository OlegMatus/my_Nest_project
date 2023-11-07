import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { UserEntity } from '../database/entities/user.entity';
import { UserCreateDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  public async getAllUsers() {
    return;
  }

  public async createUser(userData: UserCreateDto): Promise<UserEntity> {
    // const userEmail = userData.email.trim();
    const findUser = await this.userRepository.findOneBy({
      email: userData.email,
    });
    if (findUser) {
      throw new BadRequestException('User already exist');
    }
    try {
      const newUser = this.userRepository.create(userData);
      return await this.userRepository.save(newUser);
    } catch (e) {
      throw new HttpException('Create user failed', HttpStatus.BAD_REQUEST);
    }
  }
  public async getUserById(userId: string): Promise<UserEntity> {
    return await this.findUserByIdOrException(userId);
  }
  public async updateUser(userId: string, dto: any): Promise<UserEntity> {
    const entity = await this.findUserByIdOrException(userId);
    this.userRepository.merge(entity, dto);
    return await this.userRepository.save(entity);
  }
  private async findUserByIdOrException(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UnprocessableEntityException('User entity not found');
    }
    return user;
  }
}
