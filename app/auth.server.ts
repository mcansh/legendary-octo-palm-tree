import crypto from "crypto";

let LENGTH = 64;
let SALT_LENGTH = 16;

export async function hash(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // generate random 16 bytes long salt
    let salt = crypto.randomBytes(SALT_LENGTH).toString("hex");

    crypto.scrypt(password, salt, LENGTH, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${salt}:${derivedKey.toString("hex")}`);
    });
  });
}

export async function verify(
  password: string,
  hashed: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    let [salt, key] = hashed.split(":");
    crypto.scrypt(password, salt, LENGTH, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key === derivedKey.toString("hex"));
    });
  });
}
