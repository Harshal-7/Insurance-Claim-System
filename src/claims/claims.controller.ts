import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { ClaimStatus } from './claims.entity';
import { Claim } from './claims.entity';
import { CreateClaimDto, UpdateClaimDto } from './dto/claim.dto';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Get(':userId')
  async getClaimsByUserId(@Param('userId') userId: number): Promise<Claim[]> {
    return this.claimsService.findClaimsByUserId(userId);
  }

  @Get()
  async getClaims(
    @Query() query: { status?: ClaimStatus; claimType?: string },
  ): Promise<Claim[]> {
    return this.claimsService.findClaims(query);
  }

  @Get('detail/:claimId')
  async getClaimById(@Param('claimId') claimId: number): Promise<Claim> {
    return this.claimsService.findClaimById(claimId);
  }

  @Post()
  async createClaim(@Body() createClaimDto: CreateClaimDto): Promise<Claim> {
    return this.claimsService.createClaim(createClaimDto);
  }

  @Put('detail/:claimId')
  async updateClaimStatus(
    @Param('claimId') claimId: number,
    @Body() updateClaimDto: UpdateClaimDto,
  ): Promise<Claim> {
    return this.claimsService.updateClaimStatus(claimId, updateClaimDto);
  }
}
