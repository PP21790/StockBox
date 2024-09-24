const db = require("../../Models");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const BasicSetting_Modal = db.BasicSetting;
const Clients_Modal = db.Clients;
const { sendEmail } = require('../../Utils/emailService');


class Clients {


  async AddClient(req, res) {

  
    try {
      const { FullName, Email, PhoneNo, password } = req.body;


      if (!FullName) {
        return res.status(400).json({ status: false, message: "Please enter fullname" });
      }
     
      if (!Email) {
        return res.status(400).json({ status: false, message: "Please enter email" });
      } else if (!/^\S+@\S+\.\S+$/.test(Email)) {
        return res.status(400).json({ status: false, message: "please enter valid email" });
      }
      
      if (!PhoneNo) {
        return res.status(400).json({ status: false, message: "Please enter phone number" });
      } else if (!/^\d{10}$/.test(PhoneNo)) {
        return res.status(400).json({ status: false, message: "Please enter valid phone number" });
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
     

      const existingUser = await Clients_Modal.findOne({
        $or: [{ Email }, { PhoneNo }]
      });
  
      if (existingUser) {
        if (existingUser.Email === Email) {
          return res.status(400).json({ status: false, message: "Email already exists" });
        } else if (existingUser.PhoneNo === PhoneNo) {
          return res.status(400).json({ status: false, message: "Phone number already exists" });
        }
      }


      const hashedPassword = await bcrypt.hash(password, 10);
      const refer_token = crypto.randomBytes(10).toString('hex'); // 10 bytes = 20 hex characters
      const result = new Clients_Modal({
      FullName: FullName,
      Email: Email,
      PhoneNo: PhoneNo,
      password: hashedPassword,
      refer_token:refer_token,
      token:refer_token,
      })
     
      await result.save();


    const resetToken = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP


      const settings = await BasicSetting_Modal.findOne();
      if (!settings || !settings.smtp_status) {
        throw new Error('SMTP settings are not configured or are disabled');
      }
        // Email options
        const mailOptions = {
          to: result.Email,
          from: `${settings.from_name} <${settings.from_mail}>`, // Include business name
          subject: 'Password Reset',
          text: `Your verification code is: ${resetToken}. This code is valid for 10 minutes. Please do not share this code with anyone.`,
        };
    
        // Send email
        await sendEmail(mailOptions);


      return res.json({
        status: true,
        otp:resetToken,
        email:Email,
        message: "OTP has been sent to your email. Please check your email.",
      });

    } catch (error) {
     
      return res.json({
        status: false,
        message: "Server error",
        data: [],
      });
    }
  }

  async detailClient(req, res) {
    try {
        // Extract ID from request parameters
        const { id } = req.params;

        // Check if ID is provided
        if (!id) {
            return res.status(400).json({
                status: false,
                message: "Client ID is required"
            });
        }

        // Find client by ID
        const client = await Clients_Modal.findById(id);

        // If client not found
        if (!client) {
            return res.status(404).json({
                status: false,
                message: "Client not found"
            });
        }

        return res.json({
            status: true,
            message: "Client details fetched successfully",
            data: client
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Server error",
            data: []
        });
    }
}

async loginClient(req, res) {
  try {
    const { UserName, password } = req.body;  // Extract password here
    
    if (!UserName) {
      return res.status(400).json({ status: false, message: "Please enter email/phone number" });
    }
   

    if (!password) {
      return res.status(400).json({ status: false, message: "Please enter password" });
    }
   
   
    const client = await Clients_Modal.findOne({
      $or: [{ Email: UserName }, { PhoneNo : UserName }],  // Check for email or mobile
      ActiveStatus: '1',
      del: '0'   // Make sure ActiveStatus is compared as a string
    });

    if (!client) {
      return res.status(404).json({
        status: false,
        message: "client not found or account is inactive",
      });
    }

   
    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Password not valid",
      });
    }



    const token = crypto.randomBytes(10).toString('hex'); // 10 bytes = 20 hex characters
    client.token = token;
    await client.save();

    return res.json({
      status: true,
      message: "Login successful",
      data: {
        FullName: client.FullName,
        Email: client.Email,
        PhoneNo: client.PhoneNo,
        id: client.id,
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
async forgotPassword(req, res) {

  try {
    const { Email } = req.body;

    if (!Email) {
      return res.status(400).json({ status: false, message: "Please enter valid email" });
    }
   
    
    // Find the user by email
    const client = await Clients_Modal.findOne({ Email });

    if (!client) {
      return res.status(404).json({
        status: false,
        message: "Email does not exist",
      });
    }

    // Generate a reset token
    const resetToken = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
    //const resetToken = crypto.randomBytes(20).toString('hex');

    // Set the token and expiry on the user
    client.forgotPasswordToken = resetToken;
    client.forgotPasswordTokenExpiry = Date.now() + 600000; // 1 hour from now

    await client.save();

    const settings = await BasicSetting_Modal.findOne();
  if (!settings || !settings.smtp_status) {
    throw new Error('SMTP settings are not configured or are disabled');
  }
    // Email options
    const mailOptions = {
      to: client.Email,
      from: `${settings.from_name} <${settings.from_mail}>`, // Include business name
      subject: 'Password Reset',
      text: `Your verification code is: ${resetToken}. This code is valid for 10 minutes. Please do not share this code with anyone.`,
    };

    // Send email
    await sendEmail(mailOptions);

    return res.json({
      status: true,
      message: 'OTP has been sent to your email. Please check your email.',
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
    const { resetToken, newPassword, confirmPassword } = req.body;

    if (!resetToken) {
      return res.status(400).json({
        status: false,
        message: "Please enter otp",
      });
    }

    if (!newPassword) {
      return res.status(400).json({
        status: false,
        message: "Please enter new password",
      });
    }

    if (!confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "Please confirm your password",
      });
    }
    
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "New password and confirm password do not match",
      });
    }

    // Find the user by reset token and check if the token is valid
    const client = await Clients_Modal.findOne({
      forgotPasswordToken: resetToken,
      forgotPasswordTokenExpiry: { $gt: Date.now() } // Token should not be expired
    });


    if (!client) {
      return res.status(400).json({
        status: false,
        message: "Otp is invalid or expired",
      });
    }

    // Hash the new password
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the reset token
    client.password = hashedPassword;
    client.forgotPasswordToken = undefined; // Clear the token
    client.forgotPasswordTokenExpiry = undefined; // Clear the expiry

    await client.save();

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

      
      if (!currentPassword) {
        return res.status(400).json({
          status: false,
          message: "Please enter current password",
        });
      }

      if (!newPassword) {
        return res.status(400).json({
          status: false,
          message: "Please enter new password",
        });
      }


      // Find the user by ID
      const client = await Clients_Modal.findById(id);

      if (!client) {
        return res.status(404).json({
          status: false,
          message: "Client not found",
        });
      }

      // Check if the current password is correct
      const isMatch = await bcrypt.compare(currentPassword, client.password);

      if (!isMatch) {
        return res.status(401).json({
          status: false,
          message: "Current password is incorrect",
        });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      client.password = hashedPassword;
      await client.save();

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
        const { id, FullName } = req.body;

        if (!FullName) {
          return res.status(400).json({ status: false, message: "Please enter name" });
        }

        // Ensure the user ID is provided
        if (!id) {
            return res.status(400).json({
                status: false,
                message: "Something went wrong",
            });
        }

        // Find the user by ID
        const client = await Clients_Modal.findById(id);
        if (!client) {
            return res.status(404).json({
                status: false,
                message: "Client not found",
            });
        }

        // Update the user's profile information
        if (FullName) client.FullName = FullName;
      
        await client.save();

        return res.json({
            status: true,
            message: "Profile updated successfully",
            data: {
                id: client.id,
                FullName: client.FullName,
                Email: client.Email,
                PhoneNo: client.PhoneNo,
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

async deleteClient(req, res) {
  try {
    const { id } = req.params; // Extract ID from URL params

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Client ID is required",
      });
    }

  const deletedClient = await Clients_Modal.findByIdAndUpdate(
    id, 
    { del: 1 }, // Set del to true
    { new: true }  // Return the updated document
  );
    if (!deletedClient) {
      return res.status(404).json({
        status: false,
        message: "Client not found",
      });
    }

    console.log("Deleted Client:", deletedClient);
    return res.json({
      status: true,
      message: "Client deleted successfully",
      data: deletedClient,
    });
  } catch (error) {
    console.log("Error deleting client:", error);
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
}

async otpSubmit(req, res) {
  try {
    const { otp, email } = req.body;

    if (!otp) {
      return res.status(400).json({
        status: false,
        message: "Please enter otp",
      });
    }

    // Find the user by reset token and check if the token is valid
    const client = await Clients_Modal.findOne({
      Email: email
    });


    if (!client) {
      return res.status(400).json({
        status: false,
        message: "Something went wrong",
      });
    }

    client.ActiveStatus = 1;
    await client.save();

    return res.json({
      status: true,
      message: "Your registration is successfull",
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
}



}
module.exports = new Clients();