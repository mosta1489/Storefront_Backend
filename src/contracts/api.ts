import { User } from "./types";

export type SignUpRequest = Pick<
  User,
  "username" | "firstname" | "lastname" | "password"
>;
export interface SignupResponse {
  message: string;
}

export interface SignInRequest {
  username: string;
  password: string;
}
export interface SigninResponse {
  user: Pick<User, "username" | "firstname" | "lastname" | "id">;
  jwt: string;
}

export interface AllUserRequest {}
export interface AllUserResponse {
  users: Pick<User, "id">[];
}

export interface DeleteUserRequest {}
export interface DeleteUserParams {
  id: string;
}
export interface DeleteUserResponse {
  message: string;
}

export interface MakeAdminRequest {
  secret: string;
}
export interface MakeAdminResponse {
  jwt: string;
}
