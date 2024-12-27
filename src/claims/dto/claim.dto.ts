// import { ClaimStatus } from '../claims.entity';

// export class CreateClaimDto {
//   userId: number;
//   policyId: number;
//   claimType: string;
//   amountRequested: number;
//   documents: string;
// }

// export class UpdateClaimDto {
//   status: ClaimStatus;
// }

import { ClaimStatus } from '../claims.entity';

export class CreateClaimDto {
  userId: number;             
  policyNumber: string;       
  claimType: string;          
  amountRequested: number;    
  details: string;            
  documents: string;          
}

export class UpdateClaimDto {
  status: ClaimStatus;        
}