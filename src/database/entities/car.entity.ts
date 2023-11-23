import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ECarProducer } from '../../modules/car/enum/car-producer.enum';
import { CreatedUpdatedDataModel } from './common/created-updated.model';
import { UserEntity } from './user.entity';

@Entity('car')
export class CarEntity extends CreatedUpdatedDataModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'text' })
  model: string;

  @Column({ type: 'enum', enum: 'ECarProducer' })
  producer: ECarProducer;

  @ManyToOne(() => UserEntity, (entity) => entity.cars)
  user: UserEntity;
}
