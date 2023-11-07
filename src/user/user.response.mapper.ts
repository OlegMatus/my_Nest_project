import { UserEntity } from '../database/entities/user.entity';
import { UserCreateResponse } from './dto/user.dto';

export class UserResponseMapper {
  static toDetailsDto(data: UserEntity): UserCreateResponse {
    return {
      id: data.id,
      userName: data.userName,
      email: data.email,
      age: data.age,
      city: data.city,
      status: data.status,
      createdAt: data.createdAt,
    };
  }
}
