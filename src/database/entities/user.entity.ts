import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CarEntity } from './car.entity';
import { CreatedUpdatedDataModel } from './common/created-updated.model';

@Entity('user')
export class UserEntity extends CreatedUpdatedDataModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  userName: string;

  @Column({ type: 'text', unique: true })
  email: string;

  // @Column({ type: 'text' })
  // password: string;

  @Column({ type: 'text' })
  city: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'boolean', nullable: true })
  status: boolean;

  @OneToMany(() => CarEntity, (entity) => entity.user)
  cars: CarEntity[];
}
