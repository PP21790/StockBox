const db = require("../Models");
const Users_Modal = db.Users;
const Clients_Modal = db.Clients;
const Service_Modal = db.Service;
const Plan_Modal = db.Plan;
const Signal_Modal = db.Signal;
const License_Modal = db.License;
const Planmanage = db.Planmanage;
const BasicSetting_Modal = db.BasicSetting;
const Freetrial_Modal = db.Freetrial;

class Dashboard {
    async getcount(req, res) {
        try {
            // Count documents in the Clients_Modal collection where del is false
            const client = await Clients_Modal.countDocuments({ del: 0 });
            const user = await Users_Modal.countDocuments({ 
                del: 0, 
                _id: { $ne: "66bc8b0c3fb6f1724c02bfec" } 
              });
            const clientactive = await Clients_Modal.countDocuments({ del: 0,ActiveStatus:1 });
            const useractive = await Users_Modal.countDocuments({ del: 0,ActiveStatus:1 });

            const plan = await Plan_Modal.countDocuments({ del: false });
            const activeplan = await Plan_Modal.countDocuments({ del: false,status:"active" });

            const opensignal = await Signal_Modal.countDocuments({ close_status: false });
            const closesignal = await Signal_Modal.countDocuments({ close_status: true });


            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set to the start of the day
            
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1); // Set to the start of the next day
            
            // Count open signals created today
            const todayOpenSignal = await Signal_Modal.countDocuments({
              close_status: false,
              created_at: { $gte: today, $lt: tomorrow }
            });
            
            // Count closed signals with today's close date
            const todayCloseSignal = await Signal_Modal.countDocuments({
              close_status: true,
              closedate: { $gte: today, $lt: tomorrow }
            });


            const result = await Clients_Modal.find({ del: 0 })
    .sort({ _id: -1 })
    .limit(10);

    const activefreetrial = await Freetrial_Modal.aggregate([
      {
          $match: {
              enddate: { $gte: today } // Only trials ending today or later
          }
      },
      {
          $addFields: {
              clientid: { $toObjectId: "$clientid" } // Convert clientid to ObjectId for matching
          }
      },
      {
          $lookup: {
              from: 'plansubscriptions', 
              localField: 'clientid', 
              foreignField: 'client_id', 
              as: 'subscriptionInfo'
          }
      },
      {
          $addFields: {
              subscriptionCount: { $size: "$subscriptionInfo" } // Count the entries in subscriptionInfo
          }
      },
      {
          $match: {
              subscriptionCount: 0 // Only clients with no subscriptions in plansubscriptions
          }
      },
      {
          $group: {
              _id: null, 
              clientCount: { $sum: 1 } // Count of active clients
          }
      }
    ]);
    
    // Get the count of clients with inactive free trials (enddate is before today)
    const inactivefreetrial = await Freetrial_Modal.aggregate([
      {
          $match: {
              enddate: { $lt: today } // Only trials that have already expired
          }
      },
      {
          $addFields: {
              clientid: { $toObjectId: "$clientid" } // Convert clientid to ObjectId for matching
          }
      },
      {
          $lookup: {
              from: 'plansubscriptions', 
              localField: 'clientid', 
              foreignField: 'client_id', 
              as: 'subscriptionInfo'
          }
      },
      {
          $addFields: {
              subscriptionCount: { $size: "$subscriptionInfo" } // Count the entries in subscriptionInfo
          }
      },
      {
          $match: {
              subscriptionCount: 0 // Only clients with no subscriptions in plansubscriptions
          }
      },
      {
          $group: {
              _id: null, 
              clientCount: { $sum: 1 } // Count of inactive clients
          }
      }
    ]);
    
    // Retrieve total active and inactive client counts
    const totalActiveClients = activefreetrial.length > 0 ? activefreetrial[0].clientCount : 0;
    const totalInactiveClients = inactivefreetrial.length > 0 ? inactivefreetrial[0].clientCount : 0;
    
  
const clientStatusCounts = await Planmanage.aggregate([
  {
    // Step 1: Group by clientid and determine min and max enddate for each client
    $group: {
      _id: "$clientid",
      maxEnddate: { $max: "$enddate" } // Find the latest enddate for each client
    }
  },
  {
    // Step 2: Classify each client as active or inactive based on maxEnddate
    $project: {
      isActive: { $gte: ["$maxEnddate", today] } // true if maxEnddate is today or later
    }
  },
  {
    // Step 3: Group by isActive status to count active and inactive clients
    $group: {
      _id: "$isActive", // Group by active/inactive status
      clientCount: { $sum: 1 } // Count clients in each group
    }
  }
]);

// Parse the result to get counts of active and inactive clients
let activeCount = 0;
let inactiveCount = 0;
clientStatusCounts.forEach(result => {
  if (result._id === true) {
    activeCount = result.clientCount;
  } else {
    inactiveCount = result.clientCount;
  }
});



            return res.json({
                status: true,
                message: "Count retrieved successfully",
                data: {
                    clientCountTotal: client,
                    userCountTotal: user,
                    clientCountActive: clientactive,
                    userCountActive: useractive,
                    PlanCountTotal: plan,
                    PlanCountActive: activeplan,
                    OpensignalCountTotal: opensignal,
                    CloseSignalCountTotal: closesignal,
                    todayOpenSignal:todayOpenSignal,
                    todayCloseSignal:todayCloseSignal,
                    activeFreetrial:totalActiveClients,
                    inActiveFreetrial:totalInactiveClients,
                    activePlanclient:activeCount,
                    inActivePlanclient:inactiveCount,
                    Clientlist: result
                }
            });
    
        } catch (error) {
            return res.json({ status: false, message: "Server error", data: [] });
        }
    }
  
 

    async getLicense(req, res) {
        try {
          const { key } = req.body;



          const basicSetting = await BasicSetting_Modal.findOne({ company_key: key });
          
      if (!basicSetting) {

          return res.status(500).json({
            status: false,
            message: "Company Key Not Forund",
            error: error.message
        });
      }   

          const license = await License_Modal.find();

          return res.json({
            status: true,
            message: "Data retrieved successfully",
            data:license
          });
        
    } catch (error) {
        return res.json({ status: false, message: "Server error", data: [] });
    }
}


async pastPerformance(req, res) {
  try {
    const { id } = req.params;

    // Query to find signals based on the service ID
    const signals = await Signal_Modal.find({
      del: 0,
      close_status: true,
      service: new mongoose.Types.ObjectId(id) // Ensure service is an ObjectId
    });

    // Count the number of signals
    const count = signals.length;
    if (count === 0) {
      return res.status(404).json({
        status: false,
        message: "No signals found"
      });
    }

    let totalProfit = 0;
    let totalLoss = 0;
    let profitCount = 0;
    let lossCount = 0;
    let avgreturnpermonth = 0;

    const [firstSignal, lastSignal] = await Promise.all([
      Signal_Modal.findOne({
        del: 0,
        close_status: true,
        service: new mongoose.Types.ObjectId(id)
      }).sort({ created_at: 1 }), // Sort by created_at in ascending order

      Signal_Modal.findOne({
        del: 0,
        close_status: true,
        service: new mongoose.Types.ObjectId(id)
      }).sort({ created_at: -1 }) // Sort by created_at in descending order
    ]);

    if (!firstSignal || !lastSignal) {
      return res.status(404).json({
        status: false,
        message: "No signals found"
      });
    }

    const firstCreatedAt = firstSignal.created_at;
    const lastCreatedAt = lastSignal.created_at;

    const startYear = firstCreatedAt.getFullYear();
    const startMonth = firstCreatedAt.getMonth();
    const endYear = lastCreatedAt.getFullYear();
    const endMonth = lastCreatedAt.getMonth();

    const yearDifference = endYear - startYear;
    const monthDifference = endMonth - startMonth;
    const monthsBetween = yearDifference * 12 + monthDifference;

    signals.forEach(signal => {
      const entryPrice = parseFloat(signal.price); // Entry price
      const exitPrice = parseFloat(signal.closeprice); // Exit price

   
        const callType = signal.calltype; // "BUY" or "SELL"

        if (!isNaN(entryPrice) && !isNaN(exitPrice)) {
         // const profitOrLoss = exitPrice - entryPrice;
         let profitOrLoss;
         if (callType === "BUY") {
          profitOrLoss = exitPrice - entryPrice; // Profit when exit is greater
        } else if (callType === "SELL") {
          profitOrLoss = entryPrice - exitPrice; // Profit when exit is less
        }


        if (profitOrLoss >= 0) {
       //   totalProfit += profitOrLoss;

       if(id=="66dfede64a88602fbbca9b72" || id=="66dfeef84a88602fbbca9b79")
        {
          totalProfit += profitOrLoss*signal.lotsize;
        }
        else{
      totalProfit += profitOrLoss;
        }
          profitCount++;
        } else {

          if(id=="66dfede64a88602fbbca9b72" || id=="66dfeef84a88602fbbca9b79")
            {
              totalLoss += Math.abs(profitOrLoss)*signal.lotsize;
            }
            else{
                totalLoss += Math.abs(profitOrLoss);
            }
          lossCount++;
        }
      }
    });

    const accuracy = (profitCount / count) * 100;
    const avgreturnpertrade = (totalProfit - totalLoss) / count;

    if (monthsBetween > 0) {
      avgreturnpermonth = (totalProfit - totalLoss) / monthsBetween;
    } else {
      avgreturnpermonth = totalProfit - totalLoss;
    }


    return res.json({
      status: true,
      message: "Past performance data fetched successfully",
      data: {
        count: count || 0,
        totalProfit: totalProfit || 0,
        totalLoss: totalLoss || 0,
        profitCount: profitCount || 0,
        lossCount: lossCount || 0,
        accuracy: accuracy || 0,
        avgreturnpertrade: avgreturnpertrade || 0,
        avgreturnpermonth: avgreturnpermonth || 0
      }
    });
  } catch (error) {
    console.log("Error fetching signal details:", error);

    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message
    });
  }
}

async pastPerformances(req, res) {
  try {
    // Define fixed service IDs
    const serviceIds = [
      '66d2c3bebf7e6dc53ed07626', // Replace with actual service IDs
      '66dfede64a88602fbbca9b72',
      '66dfeef84a88602fbbca9b79'
    ].map(id => new mongoose.Types.ObjectId(id)); // Convert to ObjectId

    // Query to find signals based on the service IDs
    const signals = await Signal_Modal.find({
      del: 0,
      close_status: true,
      service: { $in: serviceIds } // Match any of the services
    });

    // Group signals by service ID
    const groupedSignals = signals.reduce((acc, signal) => {
      const serviceId = signal.service.toString();
      if (!acc[serviceId]) {
        acc[serviceId] = [];
      }
      acc[serviceId].push(signal);
      return acc;
    }, {});

    const results = {};
    
    // Process each service
    for (const serviceId of serviceIds) {
      const serviceIdStr = serviceId.toString();
      const serviceSignals = groupedSignals[serviceIdStr] || [];
      const count = serviceSignals.length;

      if (count === 0) {
        results[serviceIdStr] = {
          status: false,
          message: "No signals found"
        };
        continue;
      }

      let totalProfit = 0;
      let totalLoss = 0;
      let profitCount = 0;
      let lossCount = 0;
      let avgreturnpermonth = 0;

      const [firstSignal, lastSignal] = await Promise.all([
        Signal_Modal.findOne({ del: 0, close_status: true, service: serviceId }).sort({ created_at: 1 }),
        Signal_Modal.findOne({ del: 0, close_status: true, service: serviceId }).sort({ created_at: -1 })
      ]);

      if (!firstSignal || !lastSignal) {
        results[serviceIdStr] = {
          status: false,
          message: "No signals found"
        };
        continue;
      }

      const firstCreatedAt = firstSignal.created_at;
      const lastCreatedAt = lastSignal.created_at;

      const startYear = firstCreatedAt.getFullYear();
      const startMonth = firstCreatedAt.getMonth();
      const endYear = lastCreatedAt.getFullYear();
      const endMonth = lastCreatedAt.getMonth();

      const yearDifference = endYear - startYear;
      const monthDifference = endMonth - startMonth;
      const monthsBetween = yearDifference * 12 + monthDifference;

      serviceSignals.forEach(signal => {
        const entryPrice = parseFloat(signal.price); // Entry price
        const exitPrice = parseFloat(signal.closeprice); // Exit price


          const callType = signal.calltype; // "BUY" or "SELL"

          if (!isNaN(entryPrice) && !isNaN(exitPrice)) {
           // const profitOrLoss = exitPrice - entryPrice;
           let profitOrLoss;
           if (callType === "BUY") {
            profitOrLoss = exitPrice - entryPrice; // Profit when exit is greater
          } else if (callType === "SELL") {
            profitOrLoss = entryPrice - exitPrice; // Profit when exit is less
          }


          if (profitOrLoss >= 0) {

            if(serviceId=="66dfede64a88602fbbca9b72" || serviceId=="66dfeef84a88602fbbca9b79")
              {
                totalProfit += profitOrLoss*signal.lotsize;
              }
              else{
            totalProfit += profitOrLoss;
              }
            profitCount++;
          } else {
            if(serviceId=="66dfede64a88602fbbca9b72" || serviceId=="66dfeef84a88602fbbca9b79")
              {
                totalLoss += Math.abs(profitOrLoss)*signal.lotsize;
              }
              else{
            totalLoss += Math.abs(profitOrLoss);
              }
            lossCount++;
          }
        }


      });

      const accuracy = (profitCount / count) * 100;
      let avgreturnpertrade = 0;
     

         avgreturnpertrade = (totalProfit - totalLoss) / count;
    

      console.log("avgreturnpertrade",avgreturnpertrade);

      if (monthsBetween > 0) {
        avgreturnpermonth = (totalProfit - totalLoss) / monthsBetween;
      } else {
        avgreturnpermonth = totalProfit - totalLoss;
      }

      results[serviceIdStr] = {
        status: true,
        message: "Past performance data fetched successfully",
        data: {
          count,
          totalProfit,
          totalLoss,
          profitCount,
          lossCount,
          accuracy,
          avgreturnpertrade,
          avgreturnpermonth
        }
      };
    }

    return res.json({
      status: true,
      results
    });

  } catch (error) {
    console.error("Error fetching signal details:", error);

    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message
    });
  }
}

async CloseSignal(req, res) {
  try {
      const { service_id } = req.body;

      const query = {
          service: service_id,
          close_status: true,
      };
      // Fetch signals and sort by createdAt in descending order
      const signals = await Signal_Modal.find(query).sort({ created_at: -1 }).lean(); 

      return res.json({
          status: true,
          message: "Signals retrieved successfully",
          data: signals,
      });
  } catch (error) {
      console.error("Error fetching signals:", error);
      return res.json({ status: false, message: "Server error", data: [] });
  }
}


async CloseSignalWithFilter(req, res) {
  try {
      const { service_id, page = 1 } = req.body;
       let limit = 10;
      // Calculate the number of records to skip based on the page and limit
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const limitValue = parseInt(limit);

      // Define the query for closed signals by service
      const query = {
          service: service_id,
          close_status: true,
      };

      // Get the total number of matching records
      const totalRecords = await Signal_Modal.countDocuments(query);

      // Fetch signals with pagination and sorting
      const signals = await Signal_Modal.find(query)
          .sort({ created_at: -1 })
          .skip(skip)
          .limit(limitValue)
          .lean();

      // Calculate total pages
      const totalPages = Math.ceil(totalRecords / limitValue);

      // Return the response with pagination info
      return res.json({
          status: true,
          message: "Signals retrieved successfully",
          data: signals,
          pagination: {
              totalRecords,
              currentPage: page,
              limit: limitValue,
              totalPages
          }
      });
  } catch (error) {
      console.error("Error fetching signals:", error);
      return res.json({ status: false, message: "Server error", data: [] });
  }
}


async PlanExipreList(req, res) {
  try {
    const { serviceid } = req.query;  

    const filter = serviceid ? { serviceid } : {}; 
    const plans = await Planmanage.find(filter).sort({ enddate: -1 });

    // Prepare an array to store the enriched data
    const enrichedPlans = [];

    for (let plan of plans) {
      const service = await Service_Modal.findById(plan.serviceid).select('title');

      const client = await Clients_Modal.findById(plan.clientid).select('FullName PhoneNo Email');
      enrichedPlans.push({
        ...plan.toObject(), 
        serviceTitle: service ? service.title : null, 
        clientFullName: client ? client.FullName : null,
        clientMobile: client ? client.PhoneNo : null,
        clientEmail: client ? client.Email : null 

      });
    }


    return res.json({
      status: true,
      message: "get",
      data: enrichedPlans  
    });
  } catch (error) {
    return res.json({ status: false, message: "Server error", data: [] });  // Error handling
  }
}


async PlanExipreListWithFilter(req, res) {
  try {
    const { serviceid, page = 1 } = req.body; // Default values for pagination
    let limit = 10;
    const filter = serviceid ? { serviceid } : {};
console.log(page);
    // Fetch paginated plans
    const plans = await Planmanage.find(filter)
      .sort({ enddate: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // Get total count of matching plans for pagination metadata
    const totalCount = await Planmanage.countDocuments(filter);

    // Prepare an array to store the enriched data
    const enrichedPlans = [];

    for (let plan of plans) {
      const service = await Service_Modal.findById(plan.serviceid).select('title');
      const client = await Clients_Modal.findById(plan.clientid).select('FullName PhoneNo Email');

      enrichedPlans.push({
        ...plan.toObject(),
        serviceTitle: service ? service.title : null,
        clientFullName: client ? client.FullName : null,
        clientMobile: client ? client.PhoneNo : null,
        clientEmail: client ? client.Email : null
      });
    }

    return res.json({
      status: true,
      message: "get",
      data: enrichedPlans,
      pagination: {
        total: totalCount,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    return res.json({ status: false, message: "Server error", data: [] });
  }
}


}
module.exports = new Dashboard();