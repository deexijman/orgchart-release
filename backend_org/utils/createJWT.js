import jwt from "jsonwebtoken";

export const signToken = (email) => {
  return jwt.sign({ email: email }, "secret_key", {
    expiresIn: "1hr",
  });
};