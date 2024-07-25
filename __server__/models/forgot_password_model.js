import db from "../config/db.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

class ForgotPasswordModel {
  
  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM user_details_tbl WHERE EmailAddress = ?";
      db.query(query, [email], (error, rows) => {
        if (error) {
          reject(error);
        } else {
          console.log("User found:", rows[0]); // Log the retrieved user object
          if (rows.length > 0) {
            resolve(rows[0]);
          } else {
            resolve(null); // Resolve with null if no user is found
          }
        }
      });
    });
  }

  static async updateResetToken(userId, token) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE user_details_tbl SET ResetPasswordToken = ? WHERE UserID = ?";
      db.query(query, [token, userId], (error) => {
        if (error) {
          reject(error);
        } else {
          console.log("6-digit saved");
          resolve();
        }
      });
    });
  }

  static async sendPasswordResetEmail(email, resetToken) {
    try {
      // Configure nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'stefano.franco.medina@adamson.edu.ph',
          pass: 'dwvm nlqw ngzg auix'
        }
      });

      // Define email options
      const mailOptions = {
        from: 'stefano.franco.medina@adamson.edu.ph',
        to: email,
        subject: 'Reset Your Password',
        text: `This is your 6-digit verification code (please don't share it with others): ${resetToken}`
      };

      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log('Password reset email sent:', info.response);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw new Error('Failed to send email');
    }
  }
  
  static async verifyCode(email, verificationCode) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM user_details_tbl WHERE EmailAddress = ? AND ResetPasswordToken = ?";
      db.query(query, [email, verificationCode], (error, rows) => {
        if (error) {
          reject(error);
        } else {
          if (rows.length > 0) {
            resolve(rows[0]);
            console.log("Verification Code Accepted"); // Log the retrieved user object
          } else {
            resolve(null); // Resolve with null if no user is found
            console.log("Verification Code Denied"); // Log the retrieved user object
          }
        }
      });
    });
  }

  static async resetPassword(email, newPassword, confirmedNewPass) {
    return new Promise((resolve, reject) => {
      
      const hashedPassword = bcrypt.hashSync(confirmedNewPass, 10);
      
      const query = "UPDATE user_details_tbl SET Password = ? WHERE EmailAddress = ?";
      console.log(email);
      db.query(query, [hashedPassword, email], (error) => {
        if (error) {
          reject(error);
          console.log("Password update failed");
        } else {
          console.log("Password updated");
          resolve();
        }
        console.log("I am inside");
      });
    });
  }

 
}

export default ForgotPasswordModel;