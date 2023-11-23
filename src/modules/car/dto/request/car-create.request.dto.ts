import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import { ECarProducer } from '../../enum/car-producer.enum';

export class CarCreateRequestDto {
  @IsInt()
  @Min(1970)
  @Max(new Date().getFullYear())
  year: number;

  @IsInt()
  price: number;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  model: string;

  @IsEnum(ECarProducer)
  producer: ECarProducer;
}
