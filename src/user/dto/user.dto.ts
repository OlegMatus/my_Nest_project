import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserCreateDto {
  @IsString()
  userName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsOptional()
  age: number;

  @IsString()
  @IsOptional()
  city: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;
}

export class UserCreateResponse {
  id: string;
  userName: string;
  email: string;
  age: number;
  city: string;
  status: boolean;
  createdAt: Date;
}
