import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PoliciesService } from './policies.service';
import { Policy } from './policies.entity';

@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Get(':userId')
  async getActivePolicies(@Param('userId') userId: number): Promise<Policy[]> {
    return this.policiesService.findActivePolicies(userId);
  }

  @Post()
  async createPolicy(@Body() policy: Partial<Policy>): Promise<Policy> {
    return await this.policiesService.create(policy);
  }
}
