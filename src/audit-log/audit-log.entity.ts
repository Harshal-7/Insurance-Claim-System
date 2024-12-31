// // src/audit-log/audit-log.entity.ts
// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
// import { Claim } from 'src/claims/claims.entity';  // Ensure this path is correct

// @Entity('audit_logs')
// export class AuditLog {
//   @PrimaryGeneratedColumn()
//   log_id: number;

//   @ManyToOne(() => Claim, (claim) => claim.auditLogs)
//   @JoinColumn({ name: 'claim_id' })
//   claim: Claim;

//   @Column()
//   action: string;

//   @Column()
//   performed_by: string;

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   timestamp: Date;
// }
