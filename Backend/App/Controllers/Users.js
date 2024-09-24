const db = require("../Models");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Users_Modal = db.Users;
const BasicSetting_Modal = db.BasicSetting;
const { sendEmail } = require('../Utils/emailService');

class Users {


  async AddUser(req, res) {
    try {
      const { FullName, UserName, Email, PhoneNo, password, add_by } = req.body;

      if (!FullName) {
        return res.status(400).json({ status: false, message: "fullname is required" });
      }
      if (!UserName || UserName.length < 3) {
        return res.status(400).json({ status: false, message: "username must be at least 3 characters long" });
      }
      if (!Email) {
        return res.status(400).json({ status: false, message: "email is required" });
      } else if (!/^\S+@\S+\.\S+$/.test(Email)) {
        return res.status(400).json({ status: false, message: "Invalid email format" });
      }

      if (!PhoneNo) {
        return res.status(400).json({ status: false, message: "phone number is required" });
      } else if (!/^\d{10}$/.test(PhoneNo)) {
        return res.status(400).json({ status: false, message: "Invalid phone number format" });
      }
      if (!password || password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/\d/.test(password) ||
        !/[@$!%*?&#]/.test(password)) {
        return res.status(400).json({
          status: false,
          message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&#)"
        });
      }
      if (!add_by) {
        return res.status(400).json({ status: false, message: "Added by field is required" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      //  console.log("result", hashedPassword);
      const result = new Users_Modal({
        FullName: FullName,
        UserName: UserName,
        Email: Email,
        PhoneNo: PhoneNo,
        password: hashedPassword,
        add_by: add_by
      });

      await result.save();

     // console.log("result", result);
      return res.json({
        status: true,
        message: "User added successfully",
      });

    } catch (error) {
      console.log("Error adding user:", error); // Log the full error
      return res.status(500).json({ status: false, message: "Server error", error: error.message });
    }
  }



  async getUser(req, res) {

    try {

      const { } = req.body;

      //const result = await Users_Modal.find()

      const result = await Users_Modal.find({ del: 0, Role: 2 });

      return res.json({
        status: true,
        message: "get",
        data: result
      });

    } catch (error) {
      return res.json({ status: false, message: "Server error", data: [] });
    }
  }


  
  async activeUser(req, res) {

    try {

      const { } = req.body;

      //const result = await Users_Modal.find()

      const result = await Users_Modal.find({ del: 0, Role: 2, ActiveStatus: 1 });

      return res.json({
        status: true,
        message: "get",
        data: result
      });

    } catch (error) {
      return res.json({ status: false, message: "Server error", data: [] });
    }
  }

  async detailUser(req, res) {
    try {

      // Extract ID from request parameters
      const { id } = req.params;

      // Check if ID is provided
      if (!id) {
        return res.status(400).json({
          status: false,
          message: "User ID is required"
        });
      }

      const user = await Users_Modal.findById(id);

      // If client not found
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found"
        });
      }

      return res.json({
        status: true,
        message: "User details fetched successfully",
        data: user
      });

    } catch (error) {
      console.log("Error fetching user details:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        data: []
      });
    }
  }


  async updateUser(req, res) {
    try {
      const { id, FullName, Email, PhoneNo, password } = req.body;


      if (!FullName) {
        return res.status(400).json({ status: false, message: "fullName is required" });
      }

      if (!Email) {
        return res.status(400).json({ status: false, message: "email is required" });
      } else if (!/^\S+@\S+\.\S+$/.test(Email)) {
        return res.status(400).json({ status: false, message: "Invalid email format" });
      }

      if (!PhoneNo) {
        return res.status(400).json({ status: false, message: "Phone number is required" });
      } else if (!/^\d{10}$/.test(PhoneNo)) {
        return res.status(400).json({ status: false, message: "Invalid phone number format" });
      }
      if (!password || password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/\d/.test(password) ||
        !/[@$!%*?&#]/.test(password)) {
        return res.status(400).json({
          status: false,
          message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&#)"
        });
      }


      if (!id) {
        return res.status(400).json({
          status: false,
          message: "User ID is required",
        });
      }

      // Find the User by ID and update their details
      const updatedUser = await Users_Modal.findByIdAndUpdate(
        id,
        {
          FullName,
          Email,
          PhoneNo,
          password,
        },
        { updateSearchIndexser: true, runValidators: true } // Options: return the updated document and run validators
      );

      // If the client is not found
      if (!updatedUser) {
        return res.status(404).json({
          status: false,
          message: "User not found",
        });
      }

      console.log("Updated User:", updatedUser);
      return res.json({
        status: true,
        message: "User updated successfully",
        data: updatedUser,
      });

    } catch (error) {
      console.log("Error updating User:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }


  async deleteUser(req, res) {
    try {
      const { id } = req.params; // Extract ID from URL params

      if (!id) {
        return res.status(400).json({
          status: false,
          message: "User ID is required",
        });
      }

      //   const deletedUser = await Users_Modal.findByIdAndDelete(id);
      const deletedUser = await Users_Modal.findByIdAndUpdate(
        id,
        { del: 1 }, // Set del to true
        { new: true }  // Return the updated document
      );


      if (!deletedUser) {
        return res.status(404).json({
          status: false,
          message: "User not found",
        });
      }

      console.log("Deleted User:", deletedUser);
      return res.json({
        status: true,
        message: "User deleted successfully",
        data: deletedUser,
      });
    } catch (error) {
      console.log("Error deleting User:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }

  async loginUser(req, res) {
    try {
      const { UserName, password } = req.body;  // Extract password here


      if (!UserName) {
        return res.status(400).json({ status: false, message: "username is required" });
      }
      if (!password) {
        return res.status(400).json({ status: false, message: "password is required" });
      }

      const user = await Users_Modal.findOne({
        UserName: UserName,
        ActiveStatus: '1',
        del: '0'   // Make sure ActiveStatus is compared as a string
      });

      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found or account is inactive",
        });
      }



      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          status: false,
          message: "Invalid credentials",
        });
      }

      const token = crypto.randomBytes(10).toString('hex'); // 10 bytes = 20 hex characters
      user.token = token;
      await user.save();

      return res.json({
        status: true,
        message: "Login successful",
        data: {
          FullName: user.FullName,
          Email: user.Email,
          PhoneNo: user.PhoneNo,
          Role: user.Role,
          id: user.id,
          token: token,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }


  async statusChange(req, res) {
    try {
      const { id, status } = req.body;

      // Validate status
      const validStatuses = ['1', '0'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          status: false,
          message: "Invalid status value"
        });
      }

      // Find and update the plan
      const result = await Users_Modal.findByIdAndUpdate(
        id,
        { ActiveStatus: status },
        { new: true } // Return the updated document
      );

      if (!result) {
        return res.status(404).json({
          status: false,
          message: "User not found"
        });
      }

      return res.json({
        status: true,
        message: "Status updated successfully",
        data: result
      });

    } catch (error) {
      console.log("Error updating status:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        data: []
      });
    }
  }

  async updateUserPermissions(req, res) {
    try {
      const { id, permissions } = req.body;

      if (!id) {
        return res.status(400).json({
          status: false,
          message: "User ID is required",
        });
      }

      // Ensure permissions is an array
      const permissionsArray = Array.isArray(permissions) ? permissions : [permissions];

      // Retrieve the user's current permissions from the database
      const user = await Users_Modal.findById(id);
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found",
        });
      }

      // Update permissions directly with the provided array
      user.permissions = permissionsArray;

      // Save the updated user
      const updatedUser = await user.save();

      return res.json({
        status: true,
        message: "User permissions updated successfully",
        data: updatedUser,
      });

    } catch (error) {
      console.log("Error updating User permissions:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }

  async forgotPassword(req, res) {

    try {
      const { Email } = req.body;

      if (!Email) {
        return res.status(400).json({ status: false, message: "email is required" });
      } else if (!/^\S+@\S+\.\S+$/.test(Email)) {
        return res.status(400).json({ status: false, message: "Invalid email format" });
      }
      // Find the user by email
      const user = await Users_Modal.findOne({ Email });

      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User with this email does not exist",
        });
      }

      // Generate a reset token
      const resetToken = crypto.randomBytes(20).toString('hex');

      // Set the token and expiry on the user
      user.forgotPasswordToken = resetToken;
      user.forgotPasswordTokenExpiry = Date.now() + 3600000; // 1 hour from now

      await user.save();

      const settings = await BasicSetting_Modal.findOne();
      if (!settings || !settings.smtp_status) {
        throw new Error('SMTP settings are not configured or are disabled');
      }
      // Email options
      const mailOptions = {
        to: user.Email,
        from: `${settings.from_name} <${settings.from_mail}>`, // Include business name
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested to reset the password for your account.\n\n
               Please click on the following link, or paste it into your browser to complete the process:\n\n
               http://${req.headers.host}/reset-password/${resetToken}\n\n
               If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      // Send email
      await sendEmail(mailOptions);

      return res.json({
        status: true,
        message: 'Reset token sent to email',
      });

    } catch (error) {
      console.log("Error in forgotPassword:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
  async resetPassword(req, res) {
    try {
      const { resetToken, newPassword } = req.body;

      if (!resetToken || !newPassword) {
        return res.status(400).json({
          status: false,
          message: "Reset token and new password are required",
        });
      }

      // Find the user by reset token and check if the token is valid
      const user = await Users_Modal.findOne({
        forgotPasswordToken: resetToken,
        forgotPasswordTokenExpiry: { $gt: Date.now() } // Token should not be expired
      });

      if (!user) {
        return res.status(400).json({
          status: false,
          message: "Invalid or expired reset token",
        });
      }

      // Hash the new password

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password and clear the reset token
      user.password = hashedPassword;
      user.forgotPasswordToken = undefined; // Clear the token
      user.forgotPasswordTokenExpiry = undefined; // Clear the expiry

      await user.save();

      return res.json({
        status: true,
        message: "Password has been reset successfully",
      });

    } catch (error) {
      console.log("Error in resetPassword:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }


  async changePassword(req, res) {
    try {
      const { id, currentPassword, newPassword } = req.body;

      if (!id || !currentPassword || !newPassword) {
        return res.status(400).json({
          status: false,
          message: "User ID, current password, and new password are required",
        });
      }


      // Check if the current password is correct
      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        return res.status(401).json({
          status: false,
          message: "Current password is incorrect",
        });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      return res.json({
        status: true,
        message: "Password changed successfully",
      });




    } catch (error) {
      console.log("Error in changePassword:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }


  async updateProfile(req, res) {
    try {
      const { id, FullName, Email, PhoneNo } = req.body;

      if (!FullName) {
        return res.status(400).json({ status: false, message: "fullname is required" });
      }
      if (!Email) {
        return res.status(400).json({ status: false, message: "email is required" });
      } else if (!/^\S+@\S+\.\S+$/.test(Email)) {
        return res.status(400).json({ status: false, message: "Invalid email format" });
      }

      if (!PhoneNo) {
        return res.status(400).json({ status: false, message: "phone number is required" });
      } else if (!/^\d{10}$/.test(PhoneNo)) {
        return res.status(400).json({ status: false, message: "Invalid phone number format" });
      }

      // Ensure the user ID is provided
      if (!id) {
        return res.status(400).json({
          status: false,
          message: "User ID is required",
        });
      }

      // Find the user by ID
      const user = await Users_Modal.findById(id);
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found",
        });
      }

      // Update the user's profile information
      if (FullName) user.FullName = FullName;
      if (Email) user.Email = Email;
      if (PhoneNo) user.PhoneNo = PhoneNo;

      // Save the updated user profile
      await user.save();

      return res.json({
        status: true,
        message: "Profile updated successfully",
        data: {
          id: user.id,
          FullName: user.FullName,
          Email: user.Email,
          PhoneNo: user.PhoneNo,
        }
      });

    } catch (error) {
      console.log("Error in updateProfile:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }

  }



  async updateProfile(req, res) {
    try {
      const { id, FullName, Email, PhoneNo } = req.body;

      // Ensure the user ID is provided
      if (!id) {
        return res.status(400).json({
          status: false,
          message: "User ID is required",
        });
      }

      // Find the user by ID
      const user = await Users_Modal.findById(id);
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found",
        });
      }

      // Update the user's profile information
      if (FullName) user.FullName = FullName;
      if (Email) user.Email = Email;
      if (PhoneNo) user.PhoneNo = PhoneNo;

      // Save the updated user profile
      await user.save();

      return res.json({
        status: true,
        message: "Profile updated successfully",
        data: {
          id: user.id,
          FullName: user.FullName,
          Email: user.Email,
          PhoneNo: user.PhoneNo,
        }
      });

    } catch (error) {
      console.log("Error in updateProfile:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }


}



module.exports = new Users();