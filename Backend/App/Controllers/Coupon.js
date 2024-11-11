const db = require("../Models");
const Coupon_Modal = db.Coupon;
const Clients_Modal = db.Clients;
const Notification_Modal = db.Notification;
const { sendFCMNotification } = require('./Pushnotification'); 
const upload = require('../Utils/multerHelper'); 


class Coupon {

    async AddCoupon(req, res) {
        try {


          await new Promise((resolve, reject) => {
            upload('coupon').fields([{ name: 'image', maxCount: 1 }])(req, res, (err) => {
                if (err) {
                    console.log('File upload error:', err);
                    return reject(err);
                }


                resolve();
            });
        });


            const { name, code, type, value, startdate, enddate,add_by,minpurchasevalue,mincouponvalue,description } = req.body;
    

            if (!name) {
              return res.status(400).json({ status: false, message: "coupon name is required" });
            }
            if (!code) {
              return res.status(400).json({ status: false, message: "coupon code is required" });
            }

            if (!type) {
              return res.status(400).json({ status: false, message: "coupon type is required" });
            }
            if (!value) {
              return res.status(400).json({ status: false, message: "coupon value is required" });
            }

            if (!startdate) {
              return res.status(400).json({ status: false, message: "coupon startdate is required" });
            }
            if (!enddate) {
              return res.status(400).json({ status: false, message: "coupon enddate is required" });
            }
            if (!minpurchasevalue) {
              return res.status(400).json({ status: false, message: "min purchase value  is required" });
            }

            

        
            if (!add_by) {
              return res.status(400).json({ status: false, message: "add_by is required" });
            }
            const image = req.files['image'] ? req.files['image'][0].filename : null;


            

            const result = new Coupon_Modal({
                name,
                code,
                type,
                value,
                startdate,
                enddate,
                add_by,
                minpurchasevalue,
                mincouponvalue,
                image,
                description,
            });
    
            await result.save();
    

            const clients = await Clients_Modal.find({ del: 0, ActiveStatus: 1 });

            if (!clients || clients.length === 0) {

            } else
              {
            const notificationTitle = 'Important Update';
            const notificationBody = 'New Coupon Added......';
        
            for (const client of clients) {
              const deviceToken = client.devicetoken; // Adjust according to your token field name
              const resultn = new Notification_Modal({
                clientid: client._id,
                title: notificationTitle,
                message: notificationBody
            });
    
            await resultn.save();
              if (deviceToken) {
                try {
                  await sendFCMNotification(notificationTitle, notificationBody, deviceToken);
                } catch (error) {
                }
              } else {
              }
            }
          }

            console.log("Coupon successfully added:", result);
            return res.json({
                status: true,
                message: "Coupon added successfully",
                data: result,
            });
    
        } catch (error) {
            // Enhanced error logging
            console.log("Error adding coupon:", error);
    
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

      const result = await Coupon_Modal.find({ del: false }).sort({enddate:-1});

      return res.json({
        status: true,
        message: "get",
        data:result
      });

    } catch (error) {
      return res.json({ status: false, message: "Server error", data: [] });
    }
  }
  async activeCoupon(req, res) {
    try {

      const { } = req.body;

      //const result = await Coupon_Modal.find()

      const result = await Coupon_Modal.find({ del: false,status: true }).sort({enddate:-1});

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
        console.log("Error fetching Coupon details:", error);
        return res.status(500).json({
            status: false,
            message: "Server error",
            data: []
        });
    }
}


  async updateCoupon(req, res) {
    try {


      await new Promise((resolve, reject) => {
        upload('coupon').fields([{ name: 'image', maxCount: 1 }])(req, res, (err) => {
            if (err) {
                console.log('File upload error:', err);
                return reject(err);
            }

            resolve();
        });
    });

      const { id, name, code, type, value, startdate, enddate,minpurchasevalue,mincouponvalue,description } = req.body;
  

      if (!name) {
        return res.status(400).json({ status: false, message: "coupon name is required" });
      }
      if (!code) {
        return res.status(400).json({ status: false, message: "coupon code is required" });
      }

      if (!type) {
        return res.status(400).json({ status: false, message: "coupon type is required" });
      }
      if (!value) {
        return res.status(400).json({ status: false, message: "coupon value is required" });
      }

      if (!startdate) {
        return res.status(400).json({ status: false, message: "coupon startdate is required" });
      }
      if (!enddate) {
        return res.status(400).json({ status: false, message: "coupon enddate is required" });
      }
      if (!minpurchasevalue) {
        return res.status(400).json({ status: false, message: "min purchase value  is required" });
      }

     
  

      if (!id) {
        return res.status(400).json({
          status: false,
          message: "Coupon ID is required",
        });
      }
  
      const image = req.files && req.files['image'] ? req.files['image'][0].filename : null;
    
      // Prepare the update object with the fields to update
      const updateFields = {
        name,
        code,
        type,
        value,
        startdate,
        enddate,
        minpurchasevalue,
        mincouponvalue,
        description,
      };



      if (image) {
          updateFields.image = image;
      }

      const updatedCoupon = await Coupon_Modal.findByIdAndUpdate(
        id,
        updateFields,
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
      console.log("Error updating Coupon:", error);
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
      console.log("Error deleting Coupon:", error);
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
        const result = await Coupon_Modal.findByIdAndUpdate(
            id,
            { status: status },
            { new: true } // Return the updated document
        );
  
        if (!result) {
            return res.status(404).json({
                status: false,
                message: "Coupon not found"
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
module.exports = new Coupon();