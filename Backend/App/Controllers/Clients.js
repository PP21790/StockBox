const db = require("../Models");
const bcrypt = require('bcrypt');
const Clients_Modal = db.Clients;


class Clients {


  async AddClient(req, res) {
    try {
      const { FullName, Email, PhoneNo, password, token } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = new Clients_Modal({
      FullName: FullName,
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
      const { id, FullName, Email, PhoneNo, password, token } = req.body;
  
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
          token,
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
}
module.exports = new Clients();