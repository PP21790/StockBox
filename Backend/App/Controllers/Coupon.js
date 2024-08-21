const db = require("../Models");
const Coupon_Modal = db.Coupon;


class Coupon {

    async AddCoupon(req, res) {
        try {
            const { name, code, type, value, startdate, enddate } = req.body;
    
            // Debugging: Log the incoming request body to ensure the data is correct
            console.log("Request Body:", req.body);
    
            const result = new Coupon_Modal({
                name,
                code,
                type,
                value,
                startdate,
                enddate,
            });
    
            await result.save();
    
            console.log("Coupon successfully added:", result);
            return res.json({
                status: true,
                message: "Coupon added successfully",
                data: result,
            });
    
        } catch (error) {
            // Enhanced error logging
            console.error("Error adding coupon:", error);
    
            return res.status(500).json({
                status: false,
                message: "Server error",
                error: error.message,
            });
        }
    }
    

  async getCoupon(req, res) {
    try {
      const { } = req.body;

      //const result = await Coupon_Modal.find()

      const result = await Coupon_Modal.find({ del: false });

      return res.json({
        status: true,
        message: "get",
        data:result
      });

    } catch (error) {
      return res.json({ status: false, message: "Server error", data: [] });
    }
  }

  async detailCoupon(req, res) {
    try {
        // Extract ID from request parameters
        const { id } = req.params;

        // Check if ID is provided
        if (!id) {
            return res.status(400).json({
                status: false,
                message: "Coupon ID is required"
            });
        }

        const Coupon = await Coupon_Modal.findById(id);

        if (!Coupon) {
            return res.status(404).json({
                status: false,
                message: "Coupon not found"
            });
        }

        return res.json({
            status: true,
            message: "Coupon details fetched successfully",
            data: Coupon
        });

    } catch (error) {
        console.error("Error fetching Coupon details:", error);
        return res.status(500).json({
            status: false,
            message: "Server error",
            data: []
        });
    }
}


  async updateCoupon(req, res) {
    try {
      const { id, name, code, type, value, startdate, enddate } = req.body;
  
      if (!id) {
        return res.status(400).json({
          status: false,
          message: "Coupon ID is required",
        });
      }
  
      const updatedCoupon = await Coupon_Modal.findByIdAndUpdate(
        id,
        {
          name,
          code,
          type,
          value,
          startdate,
          enddate,
        },
        { new: true, runValidators: true } // Options: return the updated document and run validators
      );
  
      if (!updatedCoupon) {
        return res.status(404).json({
          status: false,
          message: "Coupon not found",
        });
      }
  
      console.log("Updated Coupon:", updatedCoupon);
      return res.json({
        status: true,
        message: "Coupon updated successfully",
        data: updatedCoupon,
      });
  
    } catch (error) {
      console.error("Error updating Coupon:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
  
  
  async deleteCoupon(req, res) {
    try {
      const { id } = req.params; // Extract ID from URL params

      if (!id) {
        return res.status(400).json({
          status: false,
          message: "Coupon ID is required",
        });
      }

      //const deletedCoupon = await Coupon_Modal.findByIdAndDelete(id);
      const deletedCoupon = await Coupon_Modal.findByIdAndUpdate(
        id, 
        { del: true }, // Set del to true
        { new: true }  // Return the updated document
      );

      if (!deletedCoupon) {
        return res.status(404).json({
          status: false,
          message: "Coupon not found",
        });
      }

      console.log("Deleted Coupon:", deletedCoupon);
      return res.json({
        status: true,
        message: "Coupon deleted successfully",
        data: deletedCoupon,
      });
    } catch (error) {
      console.error("Error deleting Coupon:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
}
module.exports = new Coupon();