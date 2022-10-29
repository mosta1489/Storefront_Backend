import dotenv from "dotenv";
dotenv.config();

const accessEnv = (key: string) => {
  if (!(key in process.env)) {
    console.log(`${key} not found in process.env!`);
    process.exit(1);
  }

  return process.env[key];
};

export default accessEnv;
