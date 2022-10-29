import { expressHandler, User } from "../contracts/types";
import {
  SigninResponse,
  SignUpRequest,
  SignInRequest,
  SignupResponse,
  DeleteUserParams,
  DeleteUserResponse,
  AllUserResponse,
  MakeAdminRequest,
  MakeAdminResponse,
} from "../contracts/api";
import { UserModel } from "../models";
import {
  createToken,
  hashPassword,
  comparePassword,
  accessEnv,
} from "../helpers";

import crypto from "crypto";
const generateUUID: string = crypto.randomUUID();

export const signUpHandler: expressHandler<
  never,
  SignUpRequest,
  SignupResponse
> = async (req, res) => {
  const { username, firstname, lastname, password } = req.body;
  if (!firstname || !lastname || !username || !password) {
    return res.status(400).send({ error: "all fields are required" });
  }

  const existing = await UserModel.getUserByUserName(username);
  if (existing) {
    return res.status(403).send({ error: "user already exists" });
  }

  const hashedPassword = await hashPassword(password);

  const user: User = {
    id: generateUUID,
    username: username,
    firstname: firstname,
    lastname: lastname,
    password: hashedPassword,
  };

  await UserModel.createUser(user);

  return res.status(200).send({ message: "User created successfully" });
};

export const signinHandler: expressHandler<
  never,
  SignInRequest,
  SigninResponse
> = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({ error: "username and password are required" });
  }
  const user = await UserModel.getUserByUserName(username);
  if (!user) {
    res.status(400).send({ error: "Incorrect username or password" });
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    res.status(400).send({ error: "Incorrect username or password" });
  }
  const jwt = createToken({ userId: user.id, isAdmin: user.isadmin });
  const { id, firstname, lastname } = user;
  const outUser = { id, username, firstname, lastname };
  return res.status(200).send({ user: outUser, jwt });
};

export const getAllUsers: expressHandler<
  never,
  never,
  AllUserResponse
> = async (req, res) => {
  const users = await UserModel.getAllUsers();
  return res.status(200).send({ users });
};

export const deleteUserHandler: expressHandler<
  DeleteUserParams,
  never,
  DeleteUserResponse
> = async (req, res) => {
  const id = req.params.id;

  await UserModel.deleteUser(id);

  return res.status(200).send({ message: "User deleted successfully" });
};

export const makeAdmin: expressHandler<
  never,
  MakeAdminRequest,
  MakeAdminResponse
> = async (req, res) => {
  const secret = req.body.secret;
  const adminSecret = accessEnv("ADMIN_SECRET");
  if (secret == adminSecret) {
    await UserModel.makeAdmin(res.locals.userId);
    const jwt = createToken({ userId: res.locals.userId, isAdmin: true });
    return res.status(200).send({ jwt });
  }
  return res.status(401).send({ error: "Incorrect secret" });
};
