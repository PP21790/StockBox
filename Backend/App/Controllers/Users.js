const db = require("../Models");
const bcrypt = require('bcrypt');
const Users_Modal = db.Users;


class Users {


  async AddUser(req, res) {
    try {
      const { FullName, UserName, Email, PhoneNo, password,add_by } = req.body;

      console.log("Password before hashing:", password);

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("result", hashedPassword);
      const result = new Users_Modal({
        FullName: FullName,
        UserName: UserName,
        Email: Email,
        PhoneNo: PhoneNo,
        password: hashedPassword,
        add_by: add_by
      });
  
      await result.save();
  
      console.log("result", result);
      return res.json({
        status: true,
        message: "User added successfully",
      });
  
    } catch (error) {
      console.error("Error adding user:", error); // Log the full error
      return res.status(500).json({ status: false, message: "Server error", error: error.message });
    }
  }
  
  async getUser(req, res) {
  
    try {
   
      const { } = req.body;

      //const result = await Users_Modal.find()

      const result = await Users_Modal.find({ del: 0,Role: 2 });

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
      const { id, FullName, Email, PhoneNo, password } = req.body;
  
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
      const { UserName, password } = req.body;  // Extract password here

      const user = await Users_Modal.findOne({
        UserName: UserName,
        ActiveStatus: '1'  // Make sure ActiveStatus is compared as a string
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

      return res.json({
        status: true,
        message: "Login successful",
        data: {
          FullName: user.FullName,
          Email: user.Email,
          PhoneNo: user.PhoneNo,
          Role: user.Role,
          id: user.id,
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


  async  statusChange(req, res) {
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
        console.error("Error updating status:", error);
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
      console.error("Error updating User permissions:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
  
  
  


}
module.exports = new Users();