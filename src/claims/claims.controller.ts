import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { Claim } from '../claims/claims.entity';
import { ClaimService } from './claims.service';

@Controller('claims')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  // Fetch all active claims for a specific user
  @Get('/:userId')
  async getClaimsByUser(@Param('userId') userId: number): Promise<Claim[]> {
    return this.claimService.getClaimsByUser(userId);
  }

  // Submit a new claim
  @Post()
  async createClaim(
    @Body('user_id') user_id: number,
    @Body('policy_id') policy_id: number,
    @Body('claim_type') claim_type: string,
    @Body('amount_requested') amount_requested: number,
    @Body('status') status: 'pending' | 'approved' | 'rejected',
    @Body('documents') documents: any,
  ): Promise<Claim> {
    return this.claimService.createClaim(user_id, policy_id, claim_type, amount_requested, status, documents);
  }

  // Fetch all claims with filter options for administrators
  @Get()
  async getAllClaims(
    @Body('status') status?: 'pending' | 'approved' | 'rejected',
    @Body('claim_type') claim_type?: string,
  ): Promise<Claim[]> {
    return this.claimService.getAllClaims(status, claim_type);
  }

  // Fetch detailed information about a specific claim
  @Get('/:claimId')
  async getClaimById(@Param('claimId') claimId: number): Promise<Claim> {
    return this.claimService.getClaimById(claimId);
  }

  // Update the status of a claim
  @Put('/:claimId')
  async updateClaimStatus(
    @Param('claimId') claimId: number,
    @Body('status') status: 'pending' | 'approved' | 'rejected',
  ): Promise<Claim> {
    return this.claimService.updateClaimStatus(claimId, status);
  }
}
