const db = require("../Models");
const mongoose = require('mongoose'); // Import mongoose
const Plan_Modal = db.Plan;
const Service_Modal = db.Service;


class Plan {

    async AddPlan(req, res) {
        try {
            const { title, description, price, validity, service_id, add_by,accuracy } = req.body;
    
            // Debugging: Log the incoming request body to ensure the data is correct
            console.log("Request Body:", req.body);
    
            const result = new Plan_Modal({
                title,
                description,
                price,
                validity,
                service_id,
                add_by,
                accuracy,
            });
    
            await result.save();
    
            console.log("Plan successfully added:", result);
            return res.json({
                status: true,
                message: "Plan added successfully",
                data: result,
            });
    
        } catch (error) {
            // Enhanced error logging
            console.error("Error adding Plan:", error);
    
            return res.status(500).json({
                status: false,
                message: "Server error",
                error: error.message,
            });
        }
    }
    

    async getPlan(req, res) {
        try {

           
            const plans = await Plan_Modal.aggregate([
                {
                    $match: { del: false } // Match plans where 'del' is false
                },
                {
                    $lookup: {
                        from: 'services', // The name of the collection to join with
                        localField: 'service_id', // The field from the Plan_Modal
                        foreignField: '_id', // The field from the Service_Modal
                        as: 'service' // The name of the new array field to add to the output documents
                    }
                },
                {
                    $unwind: {
                        path: '$service',
                        preserveNullAndEmptyArrays: true // If a plan does not have a matching service, it will still appear in the result
                    }
                }
            ]);
    
            return res.json({
                status: true,
                message: "Plans fetched successfully",
                data: plans
            });
    
        } catch (error) {
            return res.json({ 
                status: false, 
                message: "Server error", 
                data: [] 
            });
        }
    }
   

    async activePlan(req, res) {
      try {

         
          const plans = await Plan_Modal.aggregate([
              {
                  $match: { del: false,status:"active" } // Match plans where 'del' is false
              },
              {
                  $lookup: {
                      from: 'services', // The name of the collection to join with
                      localField: 'service_id', // The field from the Plan_Modal
                      foreignField: '_id', // The field from the Service_Modal
                      as: 'service' // The name of the new array field to add to the output documents
                  }
              },
              {
                  $unwind: {
                      path: '$service',
                      preserveNullAndEmptyArrays: true // If a plan does not have a matching service, it will still appear in the result
                  }
              }
          ]);
  
          return res.json({
              status: true,
              message: "Plans fetched successfully",
              data: plans
          });
  
      } catch (error) {
          return res.json({ 
              status: false, 
              message: "Server error", 
              data: [] 
          });
      }
  }
 


    async detailPlan(req, res) {
        try {
            // Extract ID from request parameters
            const { id } = req.params;
    
            // Check if ID is provided
            if (!id) {
                return res.status(400).json({
                    status: false,
                    message: "Plan ID is required"
                });
            }
    
            // Aggregation pipeline
            const plan = await Plan_Modal.aggregate([
                {
                    $match: { _id: new mongoose.Types.ObjectId(id) } // Match the specific plan by ID
                },
                {
                    $lookup: {
                        from: 'services', // The name of the collection to join with
                        localField: 'service_id', // The field from the Plan_Modal
                        foreignField: '_id', // The field from the Service_Modal
                        as: 'service' // The name of the new array field to add to the output documents
                    }
                },
                {
                    $unwind: {
                        path: '$service',
                        preserveNullAndEmptyArrays: true // If a plan does not have a matching service, it will still appear in the result
                    }
                }
            ]);
    
            // Check if Plan is found
            if (plan.length === 0) {
                return res.status(404).json({
                    status: false,
                    message: "Plan not found"
                });
            }
    
            return res.json({
                status: true,
                message: "Plan details fetched successfully",
                data: plan[0] // Since we're matching by ID, the result will be an array with a single document
            });
    
        } catch (error) {
            console.error("Error fetching Plan details:", error);
            return res.status(500).json({
                status: false,
                message: "Server error",
                data: []
            });
        }
    }

  async updatePlan(req, res) {
    try {
        const { id, title, description, price, validity, service_id,accuracy } = req.body;
  
      if (!id) {
        return res.status(400).json({
          status: false,
          message: "Plan ID is required",
        });
      }
  
      const updatedPlan = await Plan_Modal.findByIdAndUpdate(
        id,
        {
            title,
            description,
            price,
            validity,
            service_id,
            accuracy,
        },
        { plan: true, runValidators: true } // Options: return the updated document and run validators
      );
  
      if (!updatedPlan) {
        return res.status(404).json({
          status: false,
          message: "Plan not found",
        });
      }
  
      console.log("Updated Plan:", updatedPlan);
      return res.json({
        status: true,
        message: "Plan updated successfully",
        data: updatedPlan,
      });
  
    } catch (error) {
      console.error("Error updating Plan:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
  
  
  async deletePlan(req, res) {
    try {
      const { id } = req.params; // Extract ID from URL params

      if (!id) {
        return res.status(400).json({
          status: false,
          message: "Plan ID is required",
        });
      }

      //const deletedPlan = await Plan_Modal.findByIdAndDelete(id);
      const deletedPlan = await Plan_Modal.findByIdAndUpdate(
        id, 
        { del: true }, // Set del to true
        { plan: true }  // Return the updated document
      );

      if (!deletedPlan) {
        return res.status(404).json({
          status: false,
          message: "Plan not found",
        });
      }

      console.log("Deleted Plan:", deletedPlan);
      return res.json({
        status: true,
        message: "Plan deleted successfully",
        data: deletedPlan,
      });
    } catch (error) {
      console.error("Error deleting Plan:", error);
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
      const validStatuses = ['active', 'inactive'];
      if (!validStatuses.includes(status)) {
          return res.status(400).json({
              status: false,
              message: "Invalid status value"
          });
      }

      // Find and update the plan
      const result = await Plan_Modal.findByIdAndUpdate(
          id,
          { status: status },
          { new: true } // Return the updated document
      );

      if (!result) {
          return res.status(404).json({
              status: false,
              message: "Plan not found"
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
module.exports = new Plan();