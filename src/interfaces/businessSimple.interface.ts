export interface IBusinessSimple {
  _id: string;
  businessName: string;
  businessAdmin: { _id: string; name: string; email: string };
  status: "pendingAction" | "pendingVerification" | "verified" | "unverified";
}
