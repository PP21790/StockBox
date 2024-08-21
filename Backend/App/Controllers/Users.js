const db = require("../Models");
const bcrypt = require('bcrypt');
const Users_Modal = db.Users;


class Users {


  async AddUser(req, res) {
    try {
      const { FullName, UserName, Email, PhoneNo, password, Role, token } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = new Users_Modal({
      FullName: FullName,
      UserName: UserName,
      Role: Role,
      Email: Email,
      PhoneNo: PhoneNo,
      password: hashedPassword,
      token: token
      })

      await result.save();

      console.log("result", result)
      return res.json({
        status: true,
        message: "add",
      });

    } catch (error) {
      return res.json({ status: false, message: "Server error", data: [] });
    }
  }

  async getUser(req, res) {

    
    try {
      const { } = req.body;

      //const result = await Users_Modal.find()

      const result = await Users_Modal.find({ del: 0 });

      return res.json({
        status: true,
        message: "get",
        data:result
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
        console.error("Error fetching user details:", error);
        return res.status(500).json({
            status: false,
            message: "Server error",
            data: []
        });
    }
}


  async updateUser(req, res) {
    try {
      const { id, FullName, Email, PhoneNo, password, Role, token } = req.body;
  
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
          token,
          Role,
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
      console.error("Error updating User:", error);
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
      console.error("Error deleting User:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }

  async loginUser(req, res) {
    try {
      const { identifier, password } = req.body;

      const user = await Users_Modal.findOne({
        $or: [{ Email: identifier }, { PhoneNo: identifier }],
      });

      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          status: false,
          message: "Invalid credentials",
        });
      }

      return res.json({
        status: true,
        message: "Login successful",
        data: {
          FullName: user.FullName,
          Email: user.Email,
          PhoneNo: user.PhoneNo,
          Role: user.Role,
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


}
module.exports = new Users();