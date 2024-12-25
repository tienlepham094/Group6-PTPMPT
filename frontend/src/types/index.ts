import { Dayjs } from "dayjs";
import { RESOURCETYPE, STATUSREQUEST } from "../api/enum";

type Resources = {
  id: number;
  name?: string;
  description?: string;
  totalQuantity?: number;
  availableQuantity?: number;
  createdBy?: User;
  group?: Groups | null;
  type?: RESOURCETYPE;
  createdAt?: Date;
};

type User = {
  id: number;
  email?: string;
  username?: string;
};

type Groups = {
  id?: number;
  name: string;
  manager?: {
    id?: number;
  };
};

type Requests = {
  id: number;
  user: User;
  resource?: Resources;
  quantity: number;
  startTime: Dayjs;
  endTime: Dayjs;
  status?: STATUSREQUEST;
  createdAt?: Dayjs;
};
export type { Groups, Resources, User, Requests };
