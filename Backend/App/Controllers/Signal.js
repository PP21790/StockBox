const db = require("../Models");
const Signal_Modal = db.Signal;


class Signal {

    async AddSignal(req, res) {
        try {
            const { price,service,calltype,stock,tag1,tag2,tag3,stoploss,description,add_by } = req.body;
    
            console.log("Request Body:", req.body);
    
            const result = new Signal_Modal({
                price,
                service,
                calltype,
                stock,
                tag1,
                tag2,
                tag3,
                stoploss,
                description,
                add_by,
            });
    
            await result.save();
    
            console.log("Signal successfully added:", result);
            return res.json({
                status: true,
                message: "Signal added successfully",
                data: result,
            });
    
        } catch (error) {
            // Enhanced error logging
            console.error("Error adding Signal:", error);
    
            return res.status(500).json({
                status: false,
                message: "Server error",
                error: error.message,
            });
        }
    }
    

  async getSignal(req, res) {
    try {

     
     
      const { } = req.body;

    //  const result = await Signal_Modal.find()
      const result = await Signal_Modal.find({ del: 0 });


      return res.json({
        status: true,
        message: "get",
        data:result
      });

    } catch (error) {
      return res.json({ status: false, message: "Server error", data: [] });
    }
  }


  async detailSignal(req, res) {
    try {
        // Extract ID from request parameters
        const { id } = req.params;

        // Check if ID is provided
        if (!id) {
            return res.status(400).json({
                status: false,
                message: "Signal ID is required"
            });
        }

        const Signal = await Signal_Modal.findById(id);

        if (!Signal) {
            return res.status(404).json({
                status: false,
                message: "Signal not found"
            });
        }

        return res.json({
            status: true,
            message: "Signal details fetched successfully",
            data: Signal
        });

    } catch (error) {
        console.error("Error fetching Signal details:", error);
        return res.status(500).json({
            status: false,
            message: "Server error",
            data: []
        });
    }
}


  
  async deleteSignal(req, res) {
    try {
      const { id } = req.params; // Extract ID from URL params

      if (!id) {
        return res.status(400).json({
          status: false,
          message: "Signal ID is required",
        });
      }

     // const deletedSignal = await Signal_Modal.findByIdAndDelete(id);

      const deletedSignal = await Signal_Modal.findByIdAndUpdate(
        id, 
        { del: 1 }, // Set del to true
        { new: true }  // Return the updated document
      );


      if (!deletedSignal) {
        return res.status(404).json({
          status: false,
          message: "Signal not found",
        });
      }

      console.log("Deleted Signal:", deletedSignal);
      return res.json({
        status: true,
        message: "Signal deleted successfully",
        data: deletedSignal,
      });
    } catch (error) {
      console.error("Error deleting Signal:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }


  
  async closeSignal(req, res) {
    try {
      const { id, closeprice, close_status, close_description } = req.body;
  
      if (!id) {
        return res.status(400).json({
          status: false,
          message: "Signal ID is required",
        });
      }
  
      const updatedSignal = await Signal_Modal.findByIdAndUpdate(
        id,
        {
            closeprice,
            close_status,
            close_description,
        },
        { signal: true, runValidators: true } // Options: return the updated document and run validators
      );
  
      if (!updatedSignal) {
        return res.status(404).json({
          status: false,
          message: "Signal not found",
        });
      }
  
      console.log("Close Signal:", updatedSignal);
      return res.json({
        status: true,
        message: "Signal Closed successfully",
        data: updatedSignal,
      });
  
    } catch (error) {
      console.error("Error updating Signal:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
  


}
module.exports = new Signal();