// import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
// import { ClaimsService } from './claims.service';
// import { ClaimStatus } from './claims.entity';
// import { Claim } from './claims.entity';
// import { CreateClaimDto, UpdateClaimDto } from './dto/claim.dto';

// @Controller('claims')
// export class ClaimsController {
//   constructor(private readonly claimsService: ClaimsService) {}

//   @Get(':userId')
//   async getClaimsByUserId(@Param('userId') userId: number): Promise<Claim[]> {
//     return this.claimsService.findClaimsByUserId(userId);
//   }

//   @Get()
//   async getClaims(
//     @Query() query: { status?: ClaimStatus; claimType?: string },
//   ): Promise<Claim[]> {
//     return this.claimsService.findClaims(query);
//   }

//   @Get('detail/:claimId')
//   async getClaimById(@Param('claimId') claimId: number): Promise<Claim> {
//     return this.claimsService.findClaimById(claimId);
//   }

//   @Post()
//   async createClaim(@Body() createClaimDto: CreateClaimDto): Promise<Claim> {
//     return this.claimsService.createClaim(createClaimDto);
//   }

//   @Put('detail/:claimId')
//   async updateClaimStatus(
//     @Param('claimId') claimId: number,
//     @Body() updateClaimDto: UpdateClaimDto,
//   ): Promise<Claim> {
//     return this.claimsService.updateClaimStatus(claimId, updateClaimDto);
//   }
// }


import { Controller, Post, Get, Param, Body, Put, Query } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto, UpdateClaimDto } from './dto/claim.dto';
import { Claim } from './claims.entity';
import { ClaimStatus } from './claims.entity';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  // Create a new claim
  @Post('new-user')
  async create(@Body() createClaimDto: CreateClaimDto): Promise<Claim> {
    return this.claimsService.createClaim(createClaimDto);
  }

  // Get claims by userId
  @Get('user/:userId')
  async findByUser(@Param('userId') userId: number): Promise<Claim[]> {
    return this.claimsService.findClaimsByUserId(userId);
  }

  @Get('user-claims')
  async findClaims(@Query('userId') userId: number): Promise<Claim[]> {
    return this.claimsService.findClaimsByUserId(userId); // Correct method name
  }

  // Get a specific claim by claimId
  @Get(':claimId')
  async findOne(@Param('claimId') claimId: number): Promise<Claim> {
    return this.claimsService.findClaimById(claimId);
  }

  // Update the status of a claim
  @Put(':claimId/status')
  async updateStatus(
    @Param('claimId') claimId: number,
    @Body() updateClaimDto: UpdateClaimDto,
  ): Promise<Claim> {
    return this.claimsService.updateClaimStatus(claimId, updateClaimDto);
  }

  // @Put(':claimId/status')
  // async updateStatus(
  //   @Param('claimId') claimId: number,
  //   @Body() updateClaimDto: UpdateClaimDto, 
  // ): Promise<Claim> {
  //   const { status, performedBy } = updateClaimDto;  // Extract 'status' and 'performedBy' from the request body
  //   return this.claimsService.updateClaimStatus(claimId, status, performedBy);  // Pass all required arguments
  // }
}
