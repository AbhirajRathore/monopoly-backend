import jwt from "jsonwebtoken";

export const createJWT = ({ payload }: any) => {
  const jwt: any = process.env.JWT_SECRET;
  const token = jwt.sign(payload, jwt, {
    expiresIn: "30d",
  });
  console.log("create", token, process.env.JWT_SECRET);
  return token;
};

export const createLimitedTimeToken = ({ payload, expiresIn }: any) => {
  const jwt: any = process.env.JWT_SECRET;
  const token = jwt.sign(payload, jwt, {
    expiresIn: expiresIn,
  });
  return token;
};

export const isTokenValid = (token: any) => {
  try {
    const decoded = jwt.verify(token, String(process.env.JWT_SECRET));
    return decoded;
  } catch (err) {
    console.log(err);
    return false;
  }
};