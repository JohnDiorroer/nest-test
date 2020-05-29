import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  price: number;
}
