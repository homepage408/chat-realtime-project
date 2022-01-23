import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export const toHash = async (password) => {
  const salt = randomBytes(8).toString("hex");
  const buf = await scryptAsync(password, salt, 64);

  return `${buf.toString("hex")}.${salt}`;
};

export const compare = async (storedPassword, supliedPassword) => {
  const [hashPassword, salt] = storedPassword.split(".");
  const buf = await scryptAsync(supliedPassword, salt, 64);

  return buf.toString("hex") === hashPassword;
};
