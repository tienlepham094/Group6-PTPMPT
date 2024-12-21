import { RESOURCETYPE, STATE, STATUSREQUEST } from "../api/enum";

type Resources = {
  id: number;
  name?: string;
  description?: string;
  totalQuantity?: number;
  availableQuantity?: number;
  createdBy?: User;
  group?: Group | null;
  type?: RESOURCETYPE;
  createdAt?: Date;
};

type User = {
  id: number;
  email?: string;
  name?: string;
};

type Group = {
  id: number;
  name: string;
};

type Requests = {
  id: number;
  user: User;
  resource: Resources;
  quantity: number;
  startTime: Date;
  endTime: Date;
  status?: STATUSREQUEST;
  createdAt?: Date;
};
export type { Group, Resources, User, Requests };
