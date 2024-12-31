// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { AuditLog } from './audit-log.entity';
// import { Claim } from 'src/claims/claims.entity';

// @Injectable()
// export class AuditLogService {
//   constructor(
//     @InjectRepository(AuditLog)
//     private auditLogRepository: Repository<AuditLog>,
//   ) {}

//   // Create a new audit log entry
//   async createAuditLog(
//     claim: Claim,
//     action: string,
//     performed_by: string,
//   ): Promise<AuditLog> {
//     const auditLog = new AuditLog();
//     auditLog.claim = claim;
//     auditLog.action = action;
//     auditLog.performed_by = performed_by;
//     return await this.auditLogRepository.save(auditLog);
//   }
// }
