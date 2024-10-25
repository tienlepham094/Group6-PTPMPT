export type UserProfileToken = {
  userName: string;
  email: string;
  role: "ADMIN" | "USER";
  token: string;
};
export type UserProfile = {
  userName: string;
  email: string;
  role: "ADMIN" | "USER";
};
