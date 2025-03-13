import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginUser } from "../models/verifyExist.js";
import { envs } from "../config/dotenv.js";

export const authUser = async (username, password) => {
  if (!username || !password) {
    throw new Error("All fields are required!");
  }

  const user = await loginUser(username, password);

  if (user.length === 0) {
    throw new Error("Invalid username or password");
  } else {
    const userData = user[0];
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      throw new Error("Invalid username or password");
    } else {
      const token = jwt.sign(
        {
          id: userData.id,
          name: userData.name,
          username: userData.username,
          email: userData.email,
          country: userData.country,
          spend_limit: userData.spend_limit,
          reputation: userData.reputation,
          join_date: userData.join_date,
        },
        envs.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );

      return {
        token
      };
    }
  }
};
