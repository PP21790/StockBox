const db = require("../Models");
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const Clients_Modal = db.Clients;


class Clients {


  async AddClient(req, res) {
    try {
      
      const { FullName, Email, PhoneNo, password,add_by } = req.body;
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

      const refer_token = crypto.randomBytes(10).toString('hex'); 

      const hashedPassword = await bcrypt.hash(password, 10);
      const result = new Clients_Modal({
      FullName: FullName,
      Email: Email,
      PhoneNo: PhoneNo,
      password: hashedPassword,
      add_by: add_by,
      refer_token:refer_token,
      token:refer_token,
      
      
      })
     

      await result.save();

      // console.log("result", result)
      return res.json({
        status: true,
        message: "add",
      });

    } catch (error) {
      return res.json({ status: false, message: "Server error", data: [] });
    }
  }




  async getClient(req, res) {
    try {

      
      const { } = req.body;

    //  const result = await Clients_Modal.find()
    const result = await Clients_Modal.find({ del: 0 });

      return res.json({
        status: true,
        message: "get",
        data:result
      });

    } catch (error) {
      return res.json({ status: false, message: "Server error", data: [] });
    }
  }



  async activeClient(req, res) {
    try {

      
      const { } = req.body;

    //  const result = await Clients_Modal.find()
    const result = await Clients_Modal.find({ del: 0,ActiveStatus:1 });

      return res.json({
        status: true,
        message: "get",
        data:result
      });

    } catch (error) {
      return res.json({ status: false, message: "Server error", data: [] });
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
        console.error("Error fetching client details:", error);
        return res.status(500).json({
            status: false,
            message: "Server error",
            data: []
        });
    }
}


  async updateClient(req, res) {
    try {
      const { id, FullName, Email, PhoneNo, password } = req.body;


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
          message: "Client ID is required",
        });
      }
  
      // Find the client by ID and update their details
      const updatedClient = await Clients_Modal.findByIdAndUpdate(
        id,
        {
          FullName,
          Email,
          PhoneNo,
          password,
         
        },
        { new: true, runValidators: true } // Options: return the updated document and run validators
      );
  
      // If the client is not found
      if (!updatedClient) {
        return res.status(404).json({
          status: false,
          message: "Client not found",
        });
      }
  
      console.log("Updated Client:", updatedClient);
      return res.json({
        status: true,
        message: "Client updated successfully",
        data: updatedClient,
      });
  
    } catch (error) {
      console.error("Error updating client:", error);
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

    //  const deletedClient = await Clients_Modal.findByIdAndDelete(id);
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
      console.error("Error deleting client:", error);
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
        const result = await Clients_Modal.findByIdAndUpdate(
            id,
            { ActiveStatus: status },
            { new: true } // Return the updated document
        );
  
        if (!result) {
            return res.status(404).json({
                status: false,
                message: "Client not found"
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
  
}
module.exports = new Clients();