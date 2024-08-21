const db = require("../Models");
const Service_Modal = db.Service;


class Service {

    async AddService(req, res) {
        try {
            const { title } = req.body;
    
            console.log("Request Body:", req.body);
    
            const result = new Service_Modal({
                title,
            });
    
            await result.save();
    
            console.log("Service successfully added:", result);
            return res.json({
                status: true,
                message: "Service added successfully",
                data: result,
            });
    
        } catch (error) {
            // Enhanced error logging
            console.error("Error adding Service:", error);
    
            return res.status(500).json({
                status: false,
                message: "Server error",
                error: error.message,
            });
        }
    }
    

  async getService(req, res) {
    try {
      const { } = req.body;

    //  const result = await Service_Modal.find()
      const result = await Service_Modal.find({ del: false });


      return res.json({
        status: true,
        message: "get",
        data:result
      });

    } catch (error) {
      return res.json({ status: false, message: "Server error", data: [] });
    }
  }

  async detailService(req, res) {
    try {
        // Extract ID from request parameters
        const { id } = req.params;

        // Check if ID is provided
        if (!id) {
            return res.status(400).json({
                status: false,
                message: "Service ID is required"
            });
        }

        const Service = await Service_Modal.findById(id);

        if (!Service) {
            return res.status(404).json({
                status: false,
                message: "Service not found"
            });
        }

        return res.json({
            status: true,
            message: "Service details fetched successfully",
            data: Service
        });

    } catch (error) {
        console.error("Error fetching Service details:", error);
        return res.status(500).json({
            status: false,
            message: "Server error",
            data: []
        });
    }
}


  async updateService(req, res) {
    try {
      const { id, title } = req.body;
  
      if (!id) {
        return res.status(400).json({
          status: false,
          message: "Service ID is required",
        });
      }
  
      const updatedService = await Service_Modal.findByIdAndUpdate(
        id,
        {
          title,
        },
        { service: true, runValidators: true } // Options: return the updated document and run validators
      );
  
      if (!updatedService) {
        return res.status(404).json({
          status: false,
          message: "Service not found",
        });
      }
  
      console.log("Updated Service:", updatedService);
      return res.json({
        status: true,
        message: "Service updated successfully",
        data: updatedService,
      });
  
    } catch (error) {
      console.error("Error updating Service:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
  
  
  async deleteService(req, res) {
    try {
      const { id } = req.params; // Extract ID from URL params

      if (!id) {
        return res.status(400).json({
          status: false,
          message: "Service ID is required",
        });
      }

     // const deletedService = await Service_Modal.findByIdAndDelete(id);

      const deletedService = await Service_Modal.findByIdAndUpdate(
        id, 
        { del: true }, // Set del to true
        { new: true }  // Return the updated document
      );


      if (!deletedService) {
        return res.status(404).json({
          status: false,
          message: "Service not found",
        });
      }

      console.log("Deleted Service:", deletedService);
      return res.json({
        status: true,
        message: "Service deleted successfully",
        data: deletedService,
      });
    } catch (error) {
      console.error("Error deleting Service:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
}
module.exports = new Service();