const db = require("../Models");
const upload = require('../Utils/multerHelper'); 
const Signal_Modal = db.Signal;
const Stock_Modal = db.Stock;
const Notification_Modal = db.Notification;
const Planmanage = db.Planmanage;

mongoose  = require('mongoose');
const Clients_Modal = db.Clients;
const { sendFCMNotification } = require('./Pushnotification'); // Adjust if necessary




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


            const { price,calltype,stock,tag1,tag2,tag3,stoploss,description,callduration,callperiod,add_by,expirydate,segment,optiontype,strikeprice,tradesymbol,lotsize } = req.body;
        
        //    const report = req.files['report'] ? req.files['report'][0].filename : null;



        const allowedMimeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const reportFile = req.files['report'] ? req.files['report'][0] : null;

if (reportFile) {
    const fileMimeType = reportFile.mimetype; // Get the MIME type of the uploaded file
    if (!allowedMimeTypes.includes(fileMimeType)) {
        return res.status(400).json({
            status: false,
            message: "Invalid file type. Only PDF and Word files are allowed.",
        });
    }
}

// If validation passes, extract the filename
const report = reportFile ? reportFile.filename : null;

            var service;
            var serviceName;
// Set the service value based on the segment
if (segment == "C") {
  service = "66d2c3bebf7e6dc53ed07626";
  serviceName = "Cash";

} else if (segment == "O") {
  service = "66dfeef84a88602fbbca9b79";
  serviceName = "Option";
} else {
  service = "66dfede64a88602fbbca9b72";
  serviceName = "Future";
}



let stocks;
if (segment === "C") {
    stocks = await Stock_Modal.findOne({ 
        symbol: stock, 
        segment: segment, 
    });
} else if (segment === "F") {
    stocks = await Stock_Modal.findOne({ 
        symbol: stock, 
        segment: segment, 
        expiry: expirydate, 
    });
} else {
    stocks = await Stock_Modal.findOne({ 
        symbol: stock, 
        segment: segment, 
        expiry: expirydate, 
         option_type: optiontype, 
        strike: strikeprice 
    });
}


if (!stocks) {
   return res.status(404).json({
       status: false,
       message: "Stock not found"
   });
 }

         
            const result = new Signal_Modal({
              price: price,
              service: service,
              strikeprice: strikeprice,
              calltype: calltype,
              callduration:callduration,
              callperiod:callperiod,
              stock: stock,
              tag1: tag1,
              tag2: tag2,
              tag3:tag3,
              targetprice1: tag1,
              targetprice2: tag2,
              targetprice3: tag3,
              stoploss: stoploss,
              description: description,
              report: report,
              add_by:add_by,
              expirydate: expirydate,
              segment:segment,
              optiontype: optiontype,
              tradesymbol:stocks.tradesymbol,
              lotsize: lotsize,
          });
    

            await result.save();
    
           
            // const clients = await Clients_Modal.find({
            //   del: 0,
            //   ActiveStatus: 1,
            //   devicetoken: { $exists: true, $ne: null }
            // }).select('devicetoken');



            const today = new Date();

            const clients = await Clients_Modal.find({
              del: 0,
              ActiveStatus: 1,
              devicetoken: { $exists: true, $ne: null },
              _id: {
                $in: await Planmanage.find({
                  serviceid: service,  // Replace `service` with your actual service value
                  enddate: { $gte: today }
                }).distinct('clientid')  // Assuming 'clientid' is the field linking to Clients_Modal
              }
            }).select('devicetoken');

            const tokens = clients.map(client => client.devicetoken);
            
            if (tokens.length > 0) {

  
            const notificationTitle = 'Important Update';
            const notificationBody =`${serviceName} ${stock} ${calltype} AT ${price} OPEN`;
              const resultn = new Notification_Modal({
                segmentid:service,
                type:'open signal',
                title: notificationTitle,
                message: notificationBody
            });
    
            await resultn.save();


            try {
              // Send notifications to all device tokens
              await sendFCMNotification(notificationTitle, notificationBody, tokens);
              console.log('Notifications sent successfully');
            } catch (error) {
              console.error('Error sending notifications:', error);
            }


            }
          

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
    const { from, to, service, stock } = req.query;
    // Set today's date and midnight time for filtering

    // Default date range is today
 


    let fromDate;
    if (from) {
      fromDate = new Date(from) ;
    } 

    let toDate;
    if (to) {
      toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999); // End of the specified date
    } 


    

    // Build the query object with dynamic filters
    let query = { del: 0 }; // Default query

    if (fromDate && toDate) {
      query.created_at = { $gte: fromDate, $lt: toDate };
    }

    if (service) {
      query.service = service; // Convert service ID to ObjectId
    }

    if (stock) {
      query.stock = stock; // Convert stock ID to ObjectId
    }

    // Log the query for debugging

    // Execute the query and populate service and stock details
   const result = await Signal_Modal.find(query)
      .populate({ path: 'service', select: 'title' }) // Populate only the title from service
      .populate({ path: 'stock', select: 'title' })
      .sort({ created_at: -1 }); // Sort in descending order


    

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


async getSignalWithFilter(req, res) {
  try {
    const { from, to, service, stock, closestatus, search, page = 1 } = req.body;
    let limit = 10;
    // Date filtering
    let fromDate;
    if (from) {
      fromDate = new Date(from);
    }

    let toDate;
    if (to) {
      toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999); // Set to the end of the specified date
    }


   

    // Build the query object with dynamic filters
    let query = { del: 0 };

    if (fromDate && toDate) {
      query.created_at = { $gte: fromDate, $lt: toDate };
    }

    if (service) {
      query.service = service;
    }

    if (stock) {
      query.stock = stock;
    }

    if (closestatus) {
      query.close_status = closestatus;
    }


    if (search && search.trim() !== '') {
      query.$or = [
          { tradesymbol: { $regex: search, $options: 'i' } },
          { calltype: { $regex: search, $options: 'i' } },
          { price: { $regex: search, $options: 'i' } },
          { closeprice: { $regex: search, $options: 'i' } }
      ];
  }

    let sortCriteria = { created_at: -1 }; // Default sorting by created_at in descending order
    if (closestatus === true) {
      sortCriteria = { closedate: -1 }; // Sort by close_date in descending order if closestatus is true
    }

    // Convert page and limit to integers and calculate skip
    const pageNumber = parseInt(page);
    const limitValue = parseInt(limit);
    const skip = (pageNumber - 1) * limitValue;

    // Get total count for pagination
    const totalRecords = await Signal_Modal.countDocuments(query);
    const totalPages = Math.ceil(totalRecords / limitValue);

    // Fetch data with pagination
    const result = await Signal_Modal.find(query)
      .populate({ path: 'service', select: 'title' }) // Populate only the title from service
      .populate({ path: 'stock', select: 'title' })
      .sort(sortCriteria) // Sort in descending order
      .skip(skip) // Pagination: skip items
      .limit(limitValue); // Pagination: limit items

    return res.json({
      status: true,
      message: "Signals fetched successfully",
      data: result,
      pagination: {
        totalRecords,
        page: pageNumber,
        limit: limitValue,
        totalPages
      }
    });
  } catch (error) {
    return res.json({
      status: false,
      message: "Server error",
      data: []
    });
  }
}




  async detailSignal(req, res) {try {
    // Extract ID from request parameters
    const { id } = req.params;

    // Check if ID is provided
    if (!id) {
        return res.status(400).json({
            status: false,
            message: "Signal ID is required",
        });
    }

    // Fetch the signal document by ID
    const signal = await Signal_Modal.findById(id);

    // Check if signal exists
    if (!signal) {
        return res.status(404).json({
            status: false,
            message: "Signal not found",
        });
    }

    // Construct the full URL for the report file
    const protocol = req.protocol; // 'http' or 'https'
    const baseUrl = `${protocol}://${req.headers.host}`; // Construct base URL dynamically
    const enrichedSignal = {
        ...signal._doc, // Spread the original signal document
        report: signal.report ? `${baseUrl}/uploads/report/${signal.report}` : null, // Append full report URL
    };

    // Return the enriched signal
    return res.json({
        status: true,
        message: "Signal details fetched successfully",
        data: enrichedSignal,
    });

} catch (error) {
    console.error("Error fetching Signal details:", error);
    return res.status(500).json({
        status: false,
        message: "Server error",
        data: [],
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

     
      const { id, targethit1,targethit2,targethit3,targetprice1,targetprice2,targetprice3,slprice,exitprice,closestatus,closetype, close_description } = req.body;
     

      const Signal = await Signal_Modal.findById(id);

      if (!Signal) {
          return res.status(404).json({
              status: false,
              message: "Signal not found"
          });
      }
    let serviceName;
    let service;
      if (Signal.segment == "C") {
        serviceName = "Cash";
        service = "66d2c3bebf7e6dc53ed07626";
      
      } else if (Signal.segment == "O") {
        serviceName = "Option";
        service = "66dfeef84a88602fbbca9b79";
      } else {
        serviceName = "Future";
        service = "66dfede64a88602fbbca9b72";
      }

      let stock = Signal.stock;



      let close_status = false;
      let closeprice = null;
      let closedate = null;
     
      let  notificationTitle;
      let notificationBody;
      if (closetype === "1") {
        // Close at target price
        close_status = true;
        closeprice = targetprice3 || targetprice2 || targetprice1;
        closedate = new Date();
      

         notificationTitle = 'Important Update';
         notificationBody =`${serviceName} ${stock} CLOSED All Target Achieved`;



      } else if (closetype === "2") {

        
        // Close based on closestatus and target price
        close_status = closestatus;
      
        if (close_status=="true") {
          closeprice = targetprice3 || targetprice2 || targetprice1;
          closedate = new Date();
        }

        if(targetprice3)
        {
          notificationBody =`${serviceName} ${stock} CLOSED All Target Achieved`;
        }
        else 
        if(targetprice2)
        {
          var targetachive ="2nd";
          if(close_status=="true") {
           notificationBody =`${serviceName} ${stock} CLOSED Book Profits ${targetachive} Target Achived`;
           }
          else {
          notificationBody =`${serviceName} ${stock} PARTIALLY CLOSED Book Partial Profits ${targetachive} Target Achived`;
          }
        }
        else
        {
          var targetachive ="1st";
          
          if(close_status=="true") {
              notificationBody =`${serviceName} ${stock} CLOSED Book Profits ${targetachive} Target Achived`;
               }
              else {
              notificationBody =`${serviceName} ${stock} PARTIALLY CLOSED Book Partial Profits ${targetachive} Target Achived`;
              }
        }

         notificationTitle = 'Important Update';

      } else if (closetype === "3") {
        // Close at stop-loss price
        close_status = true;
        closeprice = slprice;
        closedate = new Date();
      
         notificationTitle = 'Important Update';
        notificationBody =`${serviceName} ${stock} CLOSED SL Triggered`;
          

      } else if (closetype === "4") {
        // Close at exit price
        close_status = true;
        closeprice = exitprice;
        closedate = new Date();

         notificationTitle = 'Important Update';
         notificationBody =`${serviceName} ${stock} CLOSED Exit Position AT ${exitprice}`;

      }
      
      if (!id) {
        return res.status(400).json({
          status: false,
          message: "Signal ID is required",
        });
      }
  

      const updatedSignal = await Signal_Modal.findByIdAndUpdate(
        id,
        {
            closeprice:closeprice,
            close_status:close_status,
            close_description,
            targethit1,
            targethit2,
            targethit3,
            targetprice1,
            targetprice2,
            targetprice3,
            closedate: closedate
        },
        { signal: true, runValidators: true } // Options: return the updated document and run validators
      );




      // const clients = await Clients_Modal.find({
      //   del: 0,
      //   ActiveStatus: 1,
      //   devicetoken: { $exists: true, $ne: null }
      // }).select('devicetoken');


      
      const today = new Date();

      const clients = await Clients_Modal.find({
        del: 0,
        ActiveStatus: 1,
        devicetoken: { $exists: true, $ne: null },
        _id: {
          $in: await Planmanage.find({
            serviceid: service,  // Replace `service` with your actual service value
            enddate: { $gte: today }
          }).distinct('clientid')  // Assuming 'clientid' is the field linking to Clients_Modal
        }
      }).select('devicetoken');


      const tokens = clients.map(client => client.devicetoken);

      if (tokens.length > 0) {
  
        const resultn = new Notification_Modal({
          segmentid:service,
          type:"close signal",
          title: notificationTitle,
          message: notificationBody
      });

      await resultn.save();


      try {
        // Send notifications to all device tokens
        await sendFCMNotification(notificationTitle, notificationBody, tokens);
        console.log('Notifications sent successfully');
      } catch (error) {
        console.error('Error sending notifications:', error);
      }


      }









  
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


  async updateReport(req, res) {
    try {
        // Handle file upload
        await new Promise((resolve, reject) => {
            upload('report').fields([{ name: 'report', maxCount: 1 }])(req, res, (err) => {
                if (err) {
                    console.log('File upload error:', err);
                    return reject(err);
                }
                resolve();
            });
        });

        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                status: false,
                message: "Signal ID is required",
            });
        }

        // Extract the uploaded file information
        const reportFile = req.files && req.files['report'] ? req.files['report'][0].filename : null;

        // Prepare the update object
        const updateFields = {}; // Initialize as an empty object
        if (reportFile) {
            updateFields.report = reportFile;
        }

        // Update the report in the database
        const updatedreport = await Signal_Modal.findByIdAndUpdate(
            id,
            updateFields,
            { new: true, runValidators: true } // Options to return the updated document and run validators
        );

        // If the report is not found
        if (!updatedreport) {
            return res.status(404).json({
                status: false,
                message: "Report not found",
            });
        }

        console.log("Updated Report:", updatedreport);
        return res.json({
            status: true,
            message: "Report updated successfully",
            data: updatedreport,
        });

    } catch (error) {
        console.log("Error updating Report:", error);
        return res.status(500).json({
            status: false,
            message: "Server error",
            error: error.message,
        });
    }
}




}
module.exports = new Signal();