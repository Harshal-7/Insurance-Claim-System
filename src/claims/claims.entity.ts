// import { Policy } from 'src/policies/policies.entity';
// import { User } from 'src/users/users.entity';
// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

// export enum ClaimStatus {
//   PENDING = 'pending',
//   APPROVED = 'approved',
//   REJECTED = 'rejected',
// }

// @Entity('claims')
// export class Claim {
//   @PrimaryGeneratedColumn()
//   claim_id: number;

//   @ManyToOne(() => Policy, (policy) => policy.claims)
//   policy: Policy;

//   @ManyToOne(() => User, (user) => user.claims)
//   user: User;

//   @Column()
//   claim_type: string;

//   @Column('decimal', { precision: 10, scale: 2 })
//   amount_requested: number;

//   @Column({ type: 'enum', enum: ClaimStatus })
//   status: ClaimStatus;

//   @Column()
//   submission_date: Date;

//   @Column('text')
//   documents: string;
// }


import { Policy } from 'src/policies/policies.entity';
import { User } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { IsEnum } from 'class-validator';
// import { AuditLog } from 'src/audit-log/audit-log.entity'; 

export enum ClaimStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('claims')
export class Claim {
  @PrimaryGeneratedColumn()
  claim_id: number;

  // @OneToMany(() => AuditLog, (log) => log.claim)  // Add the OneToMany relationship
  // auditLogs: AuditLog[];

  @ManyToOne(() => Policy, (policy) => policy.claims)
  policy: Policy;

  @ManyToOne(() => User, (user) => user.claims)
  user: User;

  @Column()
  claim_type: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount_requested: number;

  @Column({ type: 'enum', enum: ClaimStatus,default: ClaimStatus.PENDING })
  status: ClaimStatus;

  @Column()
  submission_date: Date;

  @Column()
  details: string;

  @Column('text')
  documents: string;
}
