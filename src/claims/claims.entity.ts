import { Policy } from 'src/policies/policies.entity';
import { User } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

export enum ClaimStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('claims')
export class Claim {
  @PrimaryGeneratedColumn()
  claim_id: number;

  @ManyToOne(() => Policy, (policy) => policy.claims)
  policy: Policy;

  @ManyToOne(() => User, (user) => user.claims)
  user: User;

  @Column()
  claim_type: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount_requested: number;

  @Column({ type: 'enum', enum: ClaimStatus })
  status: ClaimStatus;

  @Column()
  submission_date: Date;

  @Column('text')
  documents: string;
}
