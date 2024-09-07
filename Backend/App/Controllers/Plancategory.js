const db = require("../Models");
const Plancategory_Modal = db.Plancategory;


class Plancategory {

    async AddPlancategory(req, res) {
        try {
            const { title,service,add_by } = req.body;

            if (!title) {
              return res.status(400).json({ status: false, message: "title is required" });
            }
            if (!service) {
                return res.status(400).json({ status: false, message: "service is required" });
              }
            if (!add_by) {
              return res.status(400).json({ status: false, message: "add_by is required" });
            }
    
            console.log("Request Body:", req.body);
    
            const result = new Plancategory_Modal({
                title,
                service,
                add_by,
            });
    
            await result.save();
    
            console.log("Plan category successfully added:", result);
            return res.json({
                status: true,
                message: "Plan category added successfully",
                data: result,
            });
    
        } catch (error) {
            // Enhanced error logging
            console.error("Error adding Plan category:", error);
    
            return res.status(500).json({
                status: false,
                message: "Server error",
                error: error.message,
            });
        }
    }
    

  async getPlancategory(req, res) {
    try {

     
     
      const { } = req.body;

    //  const result = await Plancategory_Modal.find()
      const result = await Plancategory_Modal.find({ del: false });


      return res.json({
        status: true,
        message: "get",
        data:result
      });

    } catch (error) {
      return res.json({ status: false, message: "Server error", data: [] });
    }
  }

  async activePlancategory(req, res) {
    try {

     
     
      const { } = req.body;

    //  const result = await Plancategory_Modal.find()
      const result = await Plancategory_Modal.find({ del: false,status: true });


      return res.json({
        status: true,
        message: "get",
        data:result
      });

    } catch (error) {
      return res.json({ status: false, message: "Server error", data: [] });
    }
  }




  async detailPlancategory(req, res) {
    try {
        // Extract ID from request parameters
        const { id } = req.params;

        // Check if ID is provided
        if (!id) {
            return res.status(400).json({
                status: false,
                message: "Plan category ID is required"
            });
        }

        const plancategory = await Plancategory_Modal.findById(id);

        if (!plancategory) {
            return res.status(404).json({
                status: false,
                message: "Plancategory not found"
            });
        }

        return res.json({
            status: true,
            message: "Plancategory details fetched successfully",
            data: plancategory
        });

    } catch (error) {
        console.error("Error fetching Plancategory details:", error);
        return res.status(500).json({
            status: false,
            message: "Server error",
            data: []
        });
    }
}


  async updatePlancategory(req, res) {
    try {
      const { id, title,service } = req.body;

      if (!title) {
        return res.status(400).json({ status: false, message: "title is required" });
      }
      if (!service) {
        return res.status(400).json({ status: false, message: "service is required" });
      }
  
      if (!id) {
        return res.status(400).json({
          status: false,
          message: "Plan category ID is required",
        });
      }
  
      const updatedPlancategory = await Plancategory_Modal.findByIdAndUpdate(
        id,
        {
          title,
          service,
        },
        { Plancategory: true, runValidators: true } // Options: return the updated document and run validators
      );
  
      if (!updatedPlancategory) {
        return res.status(404).json({
          status: false,
          message: "Plancategory not found",
        });
      }
  
      console.log("Updated Plancategory:", updatedPlancategory);
      return res.json({
        status: true,
        message: "Plancategory updated successfully",
        data: updatedPlancategory,
      });
  
    } catch (error) {
      console.error("Error updating Plancategory:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
  
  
  async deletePlancategory(req, res) {
    try {
      const { id } = req.params; // Extract ID from URL params

      if (!id) {
        return res.status(400).json({
          status: false,
          message: "Plancategory ID is required",
        });
      }

     // const deletedPlancategory = await Plancategory_Modal.findByIdAndDelete(id);

      const deletedPlancategory = await Plancategory_Modal.findByIdAndUpdate(
        id, 
        { del: true }, // Set del to true
        { new: true }  // Return the updated document
      );


      if (!deletedPlancategory) {
        return res.status(404).json({
          status: false,
          message: "Plancategory not found",
        });
      }

      console.log("Deleted Plancategory:", deletedPlancategory);
      return res.json({
        status: true,
        message: "Plancategory deleted successfully",
        data: deletedPlancategory,
      });
    } catch (error) {
      console.error("Error deleting Plancategory:", error);
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
        const validStatuses = ['true', 'false'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                status: false,
                message: "Invalid status value"
            });
        }
  
        // Find and update the plan
        const result = await Plancategory_Modal.findByIdAndUpdate(
            id,
            { status: status },
            { new: true } // Return the updated document
        );
  
        if (!result) {
            return res.status(404).json({
                status: false,
                message: "Plancategory not found"
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
module.exports = new Plancategory();