// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Policy } from 'src/policies/policies.entity';
// import { User } from 'src/users/users.entity';
// import { Claim, ClaimStatus } from './claims.entity';
// import { CreateClaimDto, UpdateClaimDto } from './dto/claim.dto';

// @Injectable()
// export class ClaimsService {
//   constructor(
//     @InjectRepository(Claim)
//     private readonly claimRepository: Repository<Claim>,
//     @InjectRepository(Policy)
//     private readonly policyRepository: Repository<Policy>,
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//   ) {}

//   // Fetch all claims submitted by a user
//   async findClaimsByUserId(userId: number): Promise<Claim[]> {
//     return this.claimRepository.find({
//       where: { user: { user_id: userId } },
//       relations: ['policy', 'user'],
//     });
//   }

//   // Fetch all claims with filter options
//   async findClaims(filter: {
//     status?: ClaimStatus;
//     claimType?: string;
//   }): Promise<Claim[]> {
//     const query = this.claimRepository.createQueryBuilder('claim');

//     if (filter.status) {
//       query.andWhere('claim.status = :status', { status: filter.status });
//     }

//     if (filter.claimType) {
//       query.andWhere('claim.claim_type = :claimType', {
//         claimType: filter.claimType,
//       });
//     }

//     return query.getMany();
//   }

//   // Submit a new claim with details and document uploads.
//   async createClaim(createClaimDto: CreateClaimDto): Promise<Claim> {
//     const { userId, policyId, claimType, amountRequested, documents } =
//       createClaimDto;

//     const user = await this.userRepository.findOne({
//       where: { user_id: userId },
//     });
//     const policy = await this.policyRepository.findOne({
//       where: { policy_id: policyId },
//     });

//     if (!user || !policy) {
//       console.log('ERROR : ');

//       throw new Error('User or Policy not found');
//     }

//     const claim = this.claimRepository.create({
//       user,
//       policy,
//       claim_type: claimType,
//       amount_requested: amountRequested,
//       status: ClaimStatus.PENDING,
//       submission_date: new Date(),
//       documents,
//     });

//     // console.log('claim : ', claim);

//     return await this.claimRepository.save(claim);
//   }

//   // Update the status of a claim (approve/reject) with optional
//   async updateClaimStatus(
//     claimId: number,
//     updateClaimDto: UpdateClaimDto,
//   ): Promise<Claim> {
//     const claim = await this.claimRepository.findOne({
//       where: { claim_id: claimId },
//     });

//     if (!claim) {
//       throw new Error('Claim not found');
//     }

//     claim.status = updateClaimDto.status;

//     return this.claimRepository.save(claim);
//   }

//   // Fetch detailed information about a specific claim.
//   async findClaimById(claimId: number): Promise<Claim> {
//     return await this.claimRepository.findOne({
//       where: { claim_id: claimId },
//       relations: ['policy', 'user'],
//     });
//   }
// }

// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { CreateClaimDto, UpdateClaimDto } from './dto/claim.dto';
// import { Policy } from 'src/policies/policies.entity';
// import { User } from 'src/users/users.entity';
// import { Claim, ClaimStatus } from './claims.entity';

// @Injectable()
// export class ClaimsService {
//   constructor(
//     @InjectRepository(Claim)
//     private claimRepository: Repository<Claim>,
//     @InjectRepository(User)
//     private userRepository: Repository<User>,
//     @InjectRepository(Policy)
//     private policyRepository: Repository<Policy>,
//   ) {}

//   // Create a new claim
//   async createClaim(createClaimDto: CreateClaimDto): Promise<Claim> {
//     const { userId, policyNumber, claimType, amountRequested, documents, details } = createClaimDto;

//     // Find user by userId
//     const user = await this.userRepository.findOne({
//       where: { user_id: userId },
//     });

//     const policyId = Number(policyNumber);  // Convert string to number

//     const policy = await this.policyRepository.findOne({
//       where: { policy_id: policyId },  // Now use the policyId as a number
//     });

//     if (!user || !policy) {
//       console.log('ERROR: User or Policy not found');
//       throw new Error('User or Policy not found');
//     }

//     const claim = this.claimRepository.create({
//       user,
//       policy,
//       claim_type: claimType,
//       amount_requested: amountRequested,
//       status: ClaimStatus.PENDING,
//       submission_date: new Date(),
//       documents,
//     });

//     return await this.claimRepository.save(claim);
//   }

//   // Find claims by userId
//   async findClaimsByUserId(userId: number): Promise<Claim[]> {
//     return this.claimRepository.find({
//       where: { user: { user_id: userId } },
//       relations: ['policy', 'user'],  // Load related entities
//     });
//   }

//   // Find a specific claim by its ID
//   async findClaimById(claimId: number): Promise<Claim> {
//     const claim = await this.claimRepository.findOne({
//       where: { claim_id: claimId },
//       relations: ['policy', 'user'],
//     });

//     if (!claim) {
//       throw new NotFoundException(`Claim with ID ${claimId} not found`);
//     }

//     return claim;
//   }

//   // Update claim status
//   async updateClaimStatus(claimId: number, updateClaimDto: UpdateClaimDto): Promise<Claim> {
//     const { status } = updateClaimDto;

//     const claim = await this.claimRepository.findOne({
//       where: { claim_id: claimId },
//     });

//     if (!claim) {
//       throw new NotFoundException(`Claim with ID ${claimId} not found`);
//     }

//     // Update the claim status
//     claim.status = status;
//     return this.claimRepository.save(claim);
//   }
// }


import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClaimDto, UpdateClaimDto } from './dto/claim.dto';
import { Policy } from 'src/policies/policies.entity';
import { User } from 'src/users/users.entity';
import { Claim, ClaimStatus } from './claims.entity';
// import { AuditLogService } from 'src/audit-log/audit-log.service'; 

@Injectable()
export class ClaimsService {
  constructor(
    @InjectRepository(Claim)
    private claimRepository: Repository<Claim>,
    // private auditLogService: AuditLogService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
  ) {}

  // Create a new claim
  async createClaim(createClaimDto: CreateClaimDto): Promise<Claim> {
    const { userId, policyNumber, claimType, amountRequested, documents, details } = createClaimDto;
  
    // Validate policyNumber is a valid number
    const policyId = Number(policyNumber);
    if (isNaN(policyId)) {
      throw new BadRequestException('Invalid policy number');
    }
  
    // Find user and policy
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });
  
    const policy = await this.policyRepository.findOne({
      where: { policy_id: policyId },
    });
  
    if (!user || !policy) {
      throw new NotFoundException('User or Policy not found');
    }
  
    const claim = this.claimRepository.create({
      user,
      policy,
      claim_type: claimType,
      amount_requested: amountRequested,
      status: ClaimStatus.PENDING,
      submission_date: new Date(),
      details,
      documents,
    });
  
    return await this.claimRepository.save(claim);
  }
  

  // Find claims by userId
  async findClaimsByUserId(userId: number): Promise<Claim[]> {
    const claims = await this.claimRepository.find({
      where: { user: { user_id: userId } },
      relations: ['policy', 'user'],
    });
    console.log('Claims for user:', userId, claims); // Debug log
    return claims;
  }
  

  // Find a specific claim by its ID
  async findClaimById(claimId: number): Promise<Claim> {
    const claim = await this.claimRepository.findOne({
      where: { claim_id: claimId },
      relations: ['policy', 'user'],
    });

    if (!claim) {
      throw new NotFoundException(`Claim with ID ${claimId} not found`);
    }

    return claim;
  }

  // Update claim status
  async updateClaimStatus(claimId: number, updateClaimDto: UpdateClaimDto): Promise<Claim> {
    const { status } = updateClaimDto;

    const claim = await this.claimRepository.findOne({
      where: { claim_id: claimId },
    });

    if (!claim) {
      throw new NotFoundException(`Claim with ID ${claimId} not found`);
    }

    // Update the claim status
    claim.status = status;
    return this.claimRepository.save(claim);
  }

  // async updateClaimStatus(
  //   claimId: number,
  //   newStatus: string,
  //   performedBy: string,
  // ): Promise<Claim> {
  //   const claim = await this.claimRepository.findOne({ where: { claim_id: claimId } });
  //   if (!claim) {
  //     throw new Error('Claim not found');
  //   }

  //   // Update the claim status
  //   claim.status = ClaimStatus[newStatus as keyof typeof ClaimStatus];
  //   await this.claimRepository.save(claim);

  //   // Create an audit log entry
  //   await this.auditLogService.createAuditLog(claim, `Status changed to ${newStatus}`, performedBy);

  //   return claim;
  // }
}
