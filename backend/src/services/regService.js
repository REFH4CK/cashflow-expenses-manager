import bcrypt from "bcryptjs";
import validator from "validator";
import { regisUser } from "../models/regisUser.js";
import { verifyExist } from "../models/verifyExist.js";

export const regService = async (username, password, name, email) => {
  if (!username || !password || !name || !email) {
    throw new Error("All fields are required!");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format!");
  }

  if (password.lenght < 6) {
    throw new Error("Password must be at least 6 characters long!");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const userExist = await verifyExist(username, email);

  if (userExist.length === 0) {
    const user = await regisUser(username, hashedPassword, name, email);
    return user;
  } else {
    if (userExist[0].email === email && userExist[0].username === username) {
      throw new Error(
        "Do you have an account? Both details are already taken!"
      );
    }
    if (userExist[0].username === username) {
      throw new Error("Username already exists!");
    }
    if (userExist[0].email === email) {
      throw new Error("Email already exists!");
    }
  }
};
