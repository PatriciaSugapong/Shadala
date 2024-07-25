// Login Controller
import loginUser from "../models/login_model.js";
import bcrypt from "bcrypt";

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await loginUser.findByEmail(email);

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const passwordMatch = await loginUser.verifyPassword(user, password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      res.status(200).json({ user });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default authController;
