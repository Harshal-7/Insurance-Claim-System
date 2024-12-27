import { Claim } from 'src/claims/claims.entity';
import { User } from 'src/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('policies')
export class Policy {
  @PrimaryGeneratedColumn()
  policy_id: number;

  @ManyToOne(() => User, (user) => user.policies)
  user: User;

  @Column()
  user_id: number;

  @Column()
  policy_type: string;

  @Column('decimal', { precision: 10, scale: 2 })
  premium: number;

  @Column()
  start_date: string;

  @Column()
  end_date: string;

  @OneToMany(() => Claim, (claim) => claim.policy)
  claims: Claim[];
}
