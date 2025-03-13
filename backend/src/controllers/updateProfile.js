import { completeProfile } from "../services/completeProfile.js";

export const updateProfile = async (req, res) => {
  const { birthday, country, currency, gender, spendLimit, uid } = req.body;

  try {
    const user = await completeProfile({
      birthday,
      country,
      currency,
      gender,
      spendLimit,
      uid,
      reputation: 150,
    });

    res.status(201).json({ message: "Successfully updated!", access: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
