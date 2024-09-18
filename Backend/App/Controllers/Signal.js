const db = require("../Models");
const upload = require('../Utils/multerHelper'); 
const Signal_Modal = db.Signal;
mongoose  = require('mongoose');

class Signal {


  
    async AddSignal(req, res) {
        try {

          await new Promise((resolve, reject) => {
            upload('report').fields([{ name: 'report', maxCount: 1 }])(req, res, (err) => {
                if (err) {
                    console.error('File upload error:', err);
                    return reject(err);
                }

                resolve();
            });
        });


            const { price,service,calltype,stock,tag1,tag2,tag3,stoploss,description,callduration,callperiod,add_by } = req.body;
        
            const report = req.files['report'] ? req.files['report'][0].filename : null;


         
            const result = new Signal_Modal({
              price: price,
              service: service,
              calltype: calltype,
              callduration:callduration,
              callperiod:callperiod,
              stock: stock,
              tag1: tag1,
              tag2: tag2,
              tag3:tag3,
              stoploss: stoploss,
              description: description,
              report: report,
              add_by:add_by,
          });
    
            await result.save();
    
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
    

  /*async getSignal(req, res) {
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
*/


async getSignal(req, res) {
  try {
    const { from, to, service, stock } = req.body;
    // Set today's date and midnight time for filtering
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight for accurate comparison

    // Default date range is today
    const fromDate = from ? new Date(from) : today;
    let toDate;
    if (to) {
      toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999); // End of the specified date
    } else {
      toDate = new Date(today);
      toDate.setHours(23, 59, 59, 999); // End of today
    }



    // Build the query object with dynamic filters
    const query = {
      del: 0,
      created_at: { $gte: fromDate, $lt: toDate } // Date range filter
    };


    if (service) {
      query.service = new mongoose.Types.ObjectId(service); // Convert service ID to ObjectId
    }

    if (stock) {
      query.stock = new mongoose.Types.ObjectId(stock); // Convert stock ID to ObjectId
    }

    // Log the query for debugging


    // Execute the query and populate service and stock details
   const result = await Signal_Modal.find(query)
      .populate({ path: 'service', select: 'title' }) // Populate only the title from service
      .populate({ path: 'stock', select: 'title' }); 

    return res.json({
      status: true,
      message: "Signals fetched successfully",
      data: result
    });
  } catch (error) {
    return res.json({
      status: false,
      message: "Server error",
      data: []
    });
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
            closedate: new Date() 
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
  

  async targethitSignal(req, res) {
    try {
      const { id, targethit, targetprice } = req.body;
  
      if (!id) {
        return res.status(400).json({
          status: false,
          message: "Signal ID is required",
        });
      }
  
      const updatedSignal = await Signal_Modal.findByIdAndUpdate(
        id,
        {
          targethit,
          targetprice,
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
        message: "Signal Target Hit successfully",
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