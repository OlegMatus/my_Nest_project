import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CreatedUpdatedDataModel } from './common/created-updated.model';

@Entity('user')
export class UserEntity extends CreatedUpdatedDataModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  userName: string;

  @Column({ type: 'text', nullable: false, unique: true })
  email: string;

  @Column({ type: 'text', nullable: false })
  city: string;

  @Column({ type: 'int', nullable: false })
  age: number;

  @Column({ type: 'boolean', nullable: false })
  status: boolean;
}
