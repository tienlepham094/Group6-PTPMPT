import { RESOURCETYPE } from "../api/enum";

export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type LoginParams = {
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
  username: string;
  password: string;
};
export type RequestParams = {
  resourceType: RESOURCETYPE;
  quantity: number;
  reason: string;
  timeUsage: string;
  userId: number;
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
};
