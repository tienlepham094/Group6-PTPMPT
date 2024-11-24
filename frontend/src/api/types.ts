import {
  REQUESTSTATUS,
  RESOURCETYPE,
  ROLE,
  STATE,
  STATUSREQUEST,
} from "./enum";

type Account = {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  birthday: number;
  phone: string;
  email: string;
  role: ROLE;
  password: string;
  token: string | null;
  state: STATE | string;
  option: string | null;
  createdAt: number;
  updatedAt: number;
};
type Profile = {};
type Request = {
  requestId: string;
  user: USER;
  resourceType: RESOURCETYPE;
  quantity: number;
  startTime: string;
  end_time: string;
  statusRequest: STATUSREQUEST; // pending, approved, rejected
  reason: string;
  timeUsage: string; // in hours
  approval: string;
  allocations: string;
  createdAt: string;
  updatedAt: string;
  equestStatus: REQUESTSTATUS;
};
export type { Account, Profile, Request };
