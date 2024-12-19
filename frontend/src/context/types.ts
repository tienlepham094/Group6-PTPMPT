import { APPROVALSTATUS, RESOURCESTATUS, RESOURCETYPE } from "../api/enum";

export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type LoginParams = {
  id?: number;
  username: string;
  password: string;
  rememberMe?: boolean;
};
export type RegisterParams = {
  username: string;
  email: string;
  password: string;
};
export type UserDataType = {
  id?: number;
  username: string;
  password: string;
  role?: "admin" | "user";
};
export type RequestParams = {
  resourceType: RESOURCETYPE;
  quantity: number;
  reason: string;
  timeUsage: number;
  userId: number;
  created_at?: string; // Optional
  end_time?: string; // Optional
  requestId?: number; // Optional
  start_time?: string; // Optional
  statusRequest?: string; // Optional
  updatedAt?: string; // Optional
};

export type ResourceParams = {
  // resourceId: number;
  // allocations: Allocation;
  // timeUsage: string;
  // user_id: number;
  userId: number;
  resourceType: RESOURCETYPE;
  quantity: number;
  statusResources: RESOURCESTATUS;
};
export type ApprovalParams = {
  approvalId: string;
  request_id: string;
  admin_id: string;
  comments: string;
  approvedAt: string;
  approvalStatus: APPROVALSTATUS;
};

export type UserContextType = {
  loading: boolean;
  setLoading: (value: boolean) => void;
  user: UserDataType | null;
  setUser: (value: UserDataType | null) => void;
  logout: () => void;
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void;
  token: string | null;
  registerUser: (
    params: RegisterParams,
    errorCallback?: ErrCallbackType
  ) => void;
  isLoggedIn: () => boolean;
  openAlert: boolean;
  setOpenAlert: (value: boolean) => void;
  message: string;
  setMessage: (value: string) => void;
  severity: "success" | "info" | "warning" | "error" | undefined;
  setSeverity: (value: "success" | "info" | "warning" | "error") => void;
};
