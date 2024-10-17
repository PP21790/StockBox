const db = require("../Models");
const mongoose = require('mongoose'); // Import mongoose
const Plan_Modal = db.Plan;
const Service_Modal = db.Service;
const PlanSubscription_Modal = db.PlanSubscription;
const Planmanage = db.Planmanage;
const Clients_Modal = db.Clients;
const License_Modal = db.License;


class Plan {

    async AddPlan(req, res) {
        try {
            const { title, description, price, validity, category, add_by } = req.body;
    
            // Debugging: Log the incoming request body to ensure the data is correct
            console.log("Request Body:", req.body);
    
            const result = new Plan_Modal({
                title,
                description,
                price,
                validity,
                category,
                add_by,
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
            console.log("Error adding Plan:", error);
    
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
                      from: 'plancategories', // The name of the collection to join with
                      localField: 'category', // The field from the Plan_Modal
                      foreignField: '_id', // The field from the category
                      as: 'category' // The name of the new array field to add to the output documents
                  }
              },
              {
                  $unwind: {
                      path: '$category',
                      preserveNullAndEmptyArrays: true // If a plan does not have a matching category, it will still appear in the result
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
                        from: 'plancategories', // The name of the collection to join with
                        localField: 'category', // The field from the Plan_Modal
                        foreignField: '_id', // The field from the category
                        as: 'category' // The name of the new array field to add to the output documents
                    }
                },
                {
                    $unwind: {
                        path: '$category',
                        preserveNullAndEmptyArrays: true // If a plan does not have a matching category, it will still appear in the result
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
            console.log("Error fetching Plan details:", error);
            return res.status(500).json({
                status: false,
                message: "Server error",
                data: []
            });
        }
    }

  async updatePlan(req, res) {
    try {
        const { id, title, description, price, validity, category,accuracy } = req.body;
  
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
            category,
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
      console.log("Error updating Plan:", error);
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
      console.log("Error deleting Plan:", error);
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
      console.log("Error updating status:", error);
      return res.status(500).json({
          status: false,
          message: "Server error",
          data: []
      });
  }
}


/*
async  addPlanSubscription(req, res) {
    try {
      const { plan_id, client_id, price} = req.body;
      // Validate input
      if (!plan_id || !client_id ) {
        return res.status(400).json({ status: false, message: 'Missing required fields' });
      }
      const plan = await Plan_Modal.findById(plan_id).exec();
  
      const validityMapping = {
        '1 month': 1,
        '3 months': 3,
        '6 months': 6,
        '9 months': 9,
        '1 year': 12,
        '2 years': 24,
        '3 years': 36,
        '4 years': 48,
        '5 years': 60
      };
  
      const start = new Date();
  
      const monthsToAdd = validityMapping[plan.validity];
    
      if (monthsToAdd === undefined) {
        throw new Error('Invalid validity period');
      }
    
      const end = new Date(start);
      end.setHours(23, 59, 59, 999);  // Set to end of the day
          end.setMonth(start.getMonth() + monthsToAdd);
  
  
  
  
  
      // Create a new subscription
      const newSubscription = new PlanSubscription_Modal({
        plan_id,
        client_id,
        total:plan.price,
        plan_price:price,
        plan_start:start,
        plan_end:end
      });
  
      // Save to the database
      const savedSubscription = await newSubscription.save();
  
      // Respond with the created subscription
      return res.status(201).json({
        status: true,
        message: 'Subscription added successfully',
        data: savedSubscription
      });
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, message: 'Server error', data: [] });
    }
  }
  */

  async addPlanSubscription(req, res) {
    try {
      const { plan_id, client_id, price } = req.body;
  
      // Validate input
      if (!plan_id) {
        return res.status(400).json({ status: false, message: 'Please Select the Plan' });
      }

      if (!client_id) {
        return res.status(400).json({ status: false, message: 'Client Not Found' });
      }
  
      // Fetch the plan and populate the category
      const plan = await Plan_Modal.findById(plan_id)
        .populate('category')
        .exec();
  
      if (!plan) {
        return res.status(404).json({ status: false, message: 'Plan not found' });
      }
  
      // Map plan validity to months
      const validityMapping = {
        '1 month': 1,
        '3 months': 3,
        '6 months': 6,
        '9 months': 9,
        '1 year': 12,
        '2 years': 24,
        '3 years': 36,
        '4 years': 48,
        '5 years': 60
      };
  
      const monthsToAdd = validityMapping[plan.validity];
      if (monthsToAdd === undefined) {
        return res.status(400).json({ status: false, message: 'Invalid plan validity period' });
      }
  
      const start = new Date();
      const end = new Date(start);
      end.setHours(23, 59, 59, 999);  // Set end date to the end of the day
      end.setMonth(start.getMonth() + monthsToAdd);  // Add the plan validity duration
  
      // Split the services in the category if they exist
      const planservice = plan.category.service;
      const planservices = planservice ? planservice.split(',') : [];
  
      // Loop through each service ID and update or add the plan
      for (const serviceId of planservices) {
        const existingPlan = await Planmanage.findOne({ clientid: client_id, serviceid: serviceId }).exec();

        if (existingPlan) {
            // If the plan exists and the end date is still valid, extend it
            if (existingPlan.enddate && existingPlan.enddate > new Date()) {
               existingPlan.enddate.setMonth(existingPlan.enddate.getMonth() + monthsToAdd);
            } else {
                existingPlan.enddate = end;  // Set new end date if it has expired
                existingPlan.startdate = start; 
            }
        
        
            try {
              const savedPlan = await Planmanage.updateOne(
                { _id: existingPlan._id },  // Filter: find the document by its ID
                { $set: { 
                    enddate: existingPlan.enddate,  // Set the new end date
                    startdate: existingPlan.startdate // Set the new start date
                } }  // Update fields
            );
              //  const savedPlan = await existingPlan.save();  
                console.log("Plan updated successfully:", savedPlan);
            } catch (error) {
                console.error("Error saving updated plan:", error);
            }
        } else {



////////////////// 17/10/2024 ////////////////////////

const today = new Date(); // Aaj ki date
const existingPlans = await Planmanage.find({
    clientid: client_id,
    enddate: { $gt: today } // End date must be greater than today's date
})
.sort({ enddate: -1 }) // Sort by `enddate` in descending order
.limit(1) // Get the top result
.exec();

if (existingPlans.length > 0) {
const existingEndDate = existingPlans[0].enddate; // Get the enddate of the existing plan
const newEndDate = end; // Assuming `end` is your new plan's end date

// Check if the new end date is greater than the existing end date
if (newEndDate > existingEndDate) {

const differenceInTime = newEndDate.getTime() - existingEndDate.getTime(); // Difference in milliseconds
const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24)); // Convert milliseconds to days

let differenceInMonths;

// Logic to determine the number of months
if (differenceInDays < 15) {
  differenceInMonths = 0; // Less than a month
} else {
  // Calculate the difference in months
  differenceInMonths = differenceInDays / 30; // Convert days to months
}

// Round the months based on your requirement
if (differenceInMonths % 1 >= 0.5) {
console.log('aaaaaa');
monthsToAdd = Math.ceil(differenceInMonths); // Round up to the nearest whole number
} else {
console.log('nnnnnn');
monthsToAdd = Math.floor(differenceInMonths); // Round down to the nearest whole number
}

} 
} 


////////////////// 17/10/2024 ////////////////////////



            // If the plan does not exist, create a new one
            const newPlanManage = new Planmanage({
                clientid: client_id,
                serviceid: serviceId,
                startdate: start,
                enddate: end,
            });
        
            try {
                await newPlanManage.save();  // Save the new plan
                console.log(`Added new record for service ID: ${serviceId}`);
            } catch (error) {
                console.error("Error saving new plan:", error);
            }
        }
        
      }



////////////////// 17/10/2024 ////////////////////////
const currentDate = new Date();
const targetMonth = `${String(currentDate.getMonth() + 1).padStart(2, '0')}${currentDate.getFullYear()}`;

let license = await License_Modal.findOne({ month: targetMonth }).exec();

if (license) {
    license.noofclient += monthsToAdd;
    console.log('Month found, updating noofclient.',monthsToAdd);
} else {
    license = new License_Modal({
        month: targetMonth,
        noofclient: monthsToAdd
    });
    console.log('Month not found, inserting new record.');
}

try {
    await license.save();
    console.log('License updated successfully.');
} catch (error) {
    console.error('Error updating license:', error);
}


////////////////// 17/10/2024 ////////////////////////

  
      // Create a new plan subscription record
      const newSubscription = new PlanSubscription_Modal({
        plan_id,
        client_id,
        total: plan.price,
        plan_price: price,
        plan_start: start,
        plan_end: end,
      });
  
      // Save the subscription
      const savedSubscription = await newSubscription.save();
      // Return success response
      return res.status(201).json({
        status: true,
        message: 'Subscription added successfully',
        data: savedSubscription,
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Server error', data: [] });
    }
  }



  async  paymentHistory(req, res) {
    try {
      
      
      const result = await PlanSubscription_Modal.aggregate([
        {
          $match: {
            del: false,
          }
        },
        {
          $lookup: {
            from: 'plans', // The name of the plans collection
            localField: 'plan_id', // The field in PlanSubscription_Modal that references the plans
            foreignField: '_id', // The field in the plans collection that is referenced
            as: 'planDetails' // The name of the field in the result that will hold the joined data
          }
        },
        {
          $unwind: '$planDetails' // Optional: Unwind the result if you expect only one matching plan per subscription
        },
        {
          $lookup: {
            from: 'clients', // The name of the clients collection
            localField: 'client_id', // The field in PlanSubscription_Modal that references the client
            foreignField: '_id', // The field in the clients collection that is referenced
            as: 'clientDetails' // The name of the field in the result that will hold the joined client data
          }
        },
        {
          $unwind: '$clientDetails' // Optional: Unwind the result if you expect only one matching client per subscription
        },
        {
          $project: {
            planDetails: 1,
            clientName: '$clientDetails.FullName', // Assuming the client's name is stored in the 'name' field
            // Include other fields you want in the result
          }
        },
        {
          $sort: { createdAt: -1 } // Sort by created_at in descending order
        }
      ]);
  
      // Respond with the retrieved subscriptions
      return res.json({
        status: true,
        message: "Subscriptions retrieved successfully",
        data: result
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Server error', data: [] });
    }
  }
  





}
module.exports = new Plan();