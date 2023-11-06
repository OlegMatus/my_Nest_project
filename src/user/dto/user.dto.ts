import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserCreateDto {
  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty({ required: true, example: 'blackDog@gmail.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  age: number;

  @ApiProperty({ required: false, example: 'London' })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  status: boolean;
}
export class UserUpdateDto {}

export class UserCreateResponse extends UserCreateDto {
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
  @ApiProperty()
  id: string;
}
