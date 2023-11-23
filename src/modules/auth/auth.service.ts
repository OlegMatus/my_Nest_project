import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { Repository } from 'typeorm';

import { UserEntity } from '../../database/entities/user.entity';

@Injectable()
export class AuthService {
  private logger = new Logger();
  constructor(
    @InjectRepository(UserEntity)
    public readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    @InjectRedisClient() private readonly redisClient: RedisClient,
  ) {}
  public async validateUser(data: any): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: data.id,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
  public async signIn(data: any): Promise<string> {
    return this.jwtService.sign(data);
  }
  public async decodeToken(token: string): Promise<any> {
    try {
      return this.jwtService.decode(token);
    } catch (e) {
      this.logger.error(e);
    }
  }
  public async login(data: any) {
    const findUser = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });
    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const token = await this.signIn({
      id: findUser.id,
    });
    await this.redisClient.setEx(token, 1000, token);

    return { token };
  }
}
