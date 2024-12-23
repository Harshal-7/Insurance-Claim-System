import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new user
  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  // Fetch all users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Fetch a single user by ID
  async findOne(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    return user;
  }

  // Update a user by ID
  async update(userId: number, updates: Partial<User>): Promise<User> {
    const user = await this.findOne(userId); // Ensure user exists
    Object.assign(user, updates);
    return await this.userRepository.save(user);
  }

  // Delete a user by ID
  async delete(userId: number): Promise<DeleteResult> {
    const result = await this.userRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    return result;
  }

  // Find user by Email
  async findByEmail(email: string): Promise<any> {
    return await this.userRepository.findOneBy({
      email: email,
    });
  }
}
