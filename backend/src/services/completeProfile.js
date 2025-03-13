import { updUserData } from "../models/updUserData.js";

export const completeProfile = async ({
  birthday,
  country,
  currency,
  gender,
  spendLimit,
  uid,
  reputation,
}) => {
  if (!birthday || !country || !currency || !gender || !spendLimit || !uid) {
    throw new Error("All fields are required!");
  }

  const user = await updUserData(
    birthday,
    country,
    currency,
    gender,
    spendLimit,
    uid,
    reputation
  );

  return user;
};
