import dotenv from "dotenv";
dotenv.config();

const accessEnv = (key: string) => {
  if (!(key in process.env)) {
    throw new Error(`${key} not found in process.env!`);
  }

  return process.env[key];
};

export default accessEnv;
