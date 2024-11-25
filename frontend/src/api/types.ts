import {
  APPROVALSTATUS,
  REQUESTSTATUS,
  RESOURCETYPE,
  ROLE,
  STATE,
  STATUSREQUEST,
} from "./enum";

type Account = {
  id: string;
  email: string;
  role: ROLE;
  password: string;
  state: STATE | string;
  option: string | null;
  createdAt: number;
  updatedAt: number;
};
type User = {
  userId: number;
  username: string;
  email: string;
  passwordHash: string;
  role: ROLE;
  isActive: boolean;
  otps: OTP;
  requests: Request;
  approvals: Approval;
  createdAt: string;
  updatedAt: string;
};
type OTP = {
  id: number;
  otpCode: string;
  createdAt: string;
  expiresAt: string;
  user: User;
  expired: string;
};
type Request = {
  requestId: number;
  user: User;
  resourceType: RESOURCETYPE;
  quantity: number;
  startTime: string;
  end_time: string;
  statusRequest: STATUSREQUEST;
  reason: string;
  timeUsage: number;
  approval: Approval;
  allocations: Allocation;
  createdAt: string;
  updatedAt: string;
  equestStatus: REQUESTSTATUS;
};
type Approval = {
  approvalId: number;
  request: Request;
  admin: User;
  approvalStatus: APPROVALSTATUS;
  comments: string;
  approvedAt: string;
};
type Allocation = {
  allocationId: number;
  request: Request;
  resource: Resource;
  allocatedQuantity: number;
  allocatedAt: string;
  releasedAt: string;
};
type Resource = {
  resourceId: number;
  resourceType: RESOURCETYPE;
  quantity: string;
  statusResources: REQUESTSTATUS;
  allocations: Allocation;
  createdAt: string;
  updatedAt: string;
};
export type { Account, Request, Allocation, Approval, OTP, Resource, User };
