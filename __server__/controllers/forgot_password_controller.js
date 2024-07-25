import ForgotPasswordModel from "../models/forgot_password_model.js";

class ForgotPasswordController {
  static gemail = ''; // Declare email variable here

  static generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  static async forgotPassword(req, res) {
    // Use ForgotPasswordController.email here
    const { email } = req.body;
    ForgotPasswordController.gemail = email; // Assign value to email
    try {
      console.log(ForgotPasswordController.gemail + " is found");
      const user = await ForgotPasswordModel.findByEmail(email);
      const resetToken = ForgotPasswordController.generateOtp();

      if (!user) {
        return res.status(404).json({ message: 'Email not found' });
      }
      else
      {
        await ForgotPasswordModel.updateResetToken(user.UserID, resetToken);
      }

      const currentDate = new Date();

      // Send password reset email
      await ForgotPasswordModel.sendPasswordResetEmail(email, resetToken);

      res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
      console.error('Error sending password reset email:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async verifyCode(req, res) {
    const { verificationCode } = req.body;
      try {
      const isValid = await ForgotPasswordModel.verifyCode(ForgotPasswordController.gemail, verificationCode);
      if (isValid) {
        res.status(200).json({ message: 'Verification successful' });
      } else {
        res.status(400).json({ message: 'Invalid verification code' });
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async resetPassword(req, res) {
    const { newPassword, confirmedNewPass } = req.body;
    try {
      const isValid = await ForgotPasswordModel.resetPassword(ForgotPasswordController.gemail, newPassword, confirmedNewPass);
      if (isValid) {
        res.status(200).json({ message: 'Reset Password Successful' });
        console.log("Success");
      } else {
        res.status(400).json({ message: 'Reset Password Failed' });
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default ForgotPasswordController;
