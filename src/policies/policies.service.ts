import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policy } from './policies.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class PoliciesService {
  constructor(
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Create a new Policy
  async create(policy: Partial<Policy>): Promise<Policy> {
    // Fetch the user using the user_id to establish the relationship properly
    const user = await this.userRepository.findOne({
      where: { user_id: policy.user_id }, // Find the user by user_id
    });

    if (!user) {
      throw new Error('User not found'); // Handle error if user does not exist
    }

    const newPolicy = this.policyRepository.create({
      ...policy,
      user,
    });

    // Save and return the new policy
    return await this.policyRepository.save(newPolicy);
  }

  // Get all active policies for user
  async findActivePolicies(userId: number): Promise<Policy[]> {
    return await this.policyRepository.find({
      where: {
        user_id: userId,
      },
    });
  }
}
