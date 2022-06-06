export interface IBusinessAdmin {}
export interface IBusinessFull {
  _id: string;
  businessName: string;
  businessAdmin: IBusinessAdmin;
  businessTradeName: string;
  businessType:
    | "SoleTrader"
    | "CommercialPartnership"
    | "LimitedPartnership"
    | "PublicPartnership";
  industry: string;
  businessAddress: string;
  businessHouseNumber: string;
  businessZipCode: string;
  businessRegistrationNumber: string;
  bankAccountHolderName: string;
  bankAccountIban: string;
  bankAccountSwift: string;
  referralCode: string;
  status: "pendingAction" | "pendingVerification" | "verified" | "unverified";
}
