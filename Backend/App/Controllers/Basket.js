const db = require("../Models");
const mongoose = require('mongoose'); // Import mongoose
const Basket_Modal = db.Basket;


class Basket {

  
    async AddBasket(req, res) {
      try {
          const { title, description, add_by } = req.body;
  
        
          const result = new Basket_Modal({
                        title,
                        description,
                        add_by,
          });
  

          await result.save();
  
          return res.json({
              status: true,
              message: "Basket added successfully",
              data: result,
          });
      } catch (error) {
          console.log("Error adding Basket:", error);
  
          return res.status(500).json({
              status: false,
              message: "Server error",
              error: error.message,
          });
      }
  }
  
  async getBasket(req, res) {
    try {

        const baskets = await Basket_Modal.find({ del: false });

        return res.json({
            status: true,
            message: "Baskets fetched successfully",
            data: baskets
        });

    } catch (error) {
        console.log("An error occurred:", error);
        return res.json({ 
            status: false, 
            message: "Server error", 
            data: [] 
        });
    }
}


    async activeBasket(req, res) {
      try {

          const baskets = await Basket_Modal.find({ del: false,status:true });

          return res.json({
              status: true,
              message: "Baskets fetched successfully",
              data: baskets
          });
  
      } catch (error) {
          return res.json({ 
              status: false, 
              message: "Server error", 
              data: [] 
          });
      }
  }
 
   
  async detailBasket(req, res) {
    try {
        // Extract ID from request parameters
        const { id } = req.params;

        // Check if ID is provided
        if (!id) {
            return res.status(400).json({
                status: false,
                message: "Basket ID is required"
            });
        }

        // Find the basket by ID
        const basket = await Basket_Modal.findById(id);

        // Check if the basket is found
        if (!basket) {
            return res.status(404).json({
                status: false,
                message: "Basket not found"
            });
        }

        // Split the data by '##'
    
        // Return the basket details along with grouped data
        return res.json({
            status: true,
            message: "Basket details fetched successfully",
            data:basket
        });

    } catch (error) {
        console.log("Error fetching Basket details:", error);
        return res.status(500).json({
            status: false,
            message: "Server error",
            data: []
        });
    }
}


  async updateBasket(req, res) {
    try {
      const { id, title, description } = req.body;
  
      if (!id) {
        return res.status(400).json({
          status: false,
          message: "Basket ID is required",
        });
      }
  
      const updatedBasket = await Basket_Modal.findByIdAndUpdate(
        id,
        {
          title,
          description,
        },
        { Basket: true, runValidators: true } // Options: return the updated document and run validators
      );
  
      if (!updatedBasket) {
        return res.status(404).json({
          status: false,
          message: "Basket not found",
        });
      }
  
      console.log("Updated Basket:", updatedBasket);
      return res.json({
        status: true,
        message: "Basket updated successfully",
        data: updatedBasket,
      });
  
    } catch (error) {
      console.log("Error updating Basket:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
  
  
  async deleteBasket(req, res) {
    try {
      const { id } = req.params; // Extract ID from URL params

      if (!id) {
        return res.status(400).json({
          status: false,
          message: "Basket ID is required",
        });
      }

      //const deletedBasket = await Basket_Modal.findByIdAndDelete(id);
      const deletedBasket = await Basket_Modal.findByIdAndUpdate(
        id, 
        { del: true }, // Set del to true
        { Basket: true }  // Return the updated document
      );

      if (!deletedBasket) {
        return res.status(404).json({
          status: false,
          message: "Basket not found",
        });
      }

      console.log("Deleted Basket:", deletedBasket);
      return res.json({
        status: true,
        message: "Basket deleted successfully",
        data: deletedBasket,
      });
    } catch (error) {
      console.log("Error deleting Basket:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
// Ensure this is at the top level of your file, not inside another function or block
async  statusChange(req, res) {
  try {
      const { id, status } = req.body;

      // Validate status
      const validStatuses = [true, false];
      if (!validStatuses.includes(status)) {
          return res.status(400).json({
              status: false,
              message: "Invalid status value"
          });
      }

      // Find and update the Basket
      const result = await Basket_Modal.findByIdAndUpdate(
          id,
          { status: status },
          { new: true } // Return the updated document
      );

      if (!result) {
          return res.status(404).json({
              status: false,
              message: "Basket not found"
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


  
}
module.exports = new Basket();