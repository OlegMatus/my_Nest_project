import { ECarProducer } from '../../enum/car-producer.enum';

export class CarDetailsResponseDto {
  id: string;
  year: number;
  price: number;
  model: string;
  producer: ECarProducer;
  createdAt: Date;
}
