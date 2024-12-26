import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaimsService } from './claims.service';
import { ClaimsController } from './claims.controller';
import { Claim } from './claims.entity';
import { Policy } from 'src/policies/policies.entity';
import { User } from 'src/users/users.entity';
import { PoliciesModule } from 'src/policies/policies.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Claim, Policy, User]),
    PoliciesModule,
    UsersModule,
  ],
  controllers: [ClaimsController],
  providers: [ClaimsService],
  exports: [ClaimsService],
})
export class ClaimsModule {}
