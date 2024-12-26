import { ClaimStatus } from '../claims.entity';

export class CreateClaimDto {
  userId: number;
  policyId: number;
  claimType: string;
  amountRequested: number;
  documents: string;
}

export class UpdateClaimDto {
  status: ClaimStatus;
}
