const db = require("../../Models");
const BasicSetting_Modal = db.BasicSetting;
const Banner_Modal = db.Banner;
const Blogs_Modal = db.Blogs;
const News_Modal = db.News;
const Plan_Modal = db.Plan;
const Service_Modal = db.Service;
const Plancategory_Modal = db.Plancategory;
const PlanSubscription_Modal = db.PlanSubscription;
const Coupon_Modal = db.Coupon;
const Signal_Modal = db.Signal;
const Stock_Modal = db.Stock;
const Faq_Modal = db.Faq;
const Content_Modal = db.Content;
const Basket_Modal = db.Basket;
const BasketSubscription_Modal = db.BasketSubscription;
const Planmanage = db.Planmanage;
const Refer_Modal = db.Refer;
const Clients_Modal = db.Clients;


mongoose  = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


class List {


    async Bannerlist(req, res) {
        try {

            const banners = await Banner_Modal.find({ del: false,status: true });
            const protocol = req.protocol; // Will be 'http' or 'https'
            const baseUrl = `${protocol}://${req.headers.host}`;

            const bannerWithImageUrls = banners.map(banner => {
                return {
                    ...banner._doc, // Spread the original bannerss document
                    image: banner.image ? `${baseUrl}/uploads/banner/${banner.image}` : null // Append full image URL
                };
            });
            


            return res.status(200).json({
                status: true,
                message: "Banner retrieved successfully",
                data: bannerWithImageUrls
            });
        } catch (error) {
            console.error("Error retrieving Banner:", error);
            return res.status(500).json({
                status: false,
                message: "Server error",
                error: error.message
            });
        }
    }


    async Blogslist(req, res) {
        try {

            const blogs = await Blogs_Modal.find({ del: false,status: true });
            const protocol = req.protocol; // Will be 'http' or 'https'
            const baseUrl = `${protocol}://${req.headers.host}`;

            const blogsWithImageUrls = blogs.map(blog => {
                return {
                    ...blog._doc, // Spread the original blog document
                    image: blog.image ? `${baseUrl}/uploads/blogs/${blog.image}` : null // Append full image URL
                };
            });


            return res.status(200).json({
                status: true,
                message: "Blogs retrieved successfully",
                data: blogsWithImageUrls
            });
        } catch (error) {
            console.error("Error retrieving blogs:", error);
            return res.status(500).json({
                status: false,
                message: "Server error",
                error: error.message
            });
        }
    }

    async Newslist(req, res) {
      
        try {

           // const news = await News_Modal.find();
            const news = await News_Modal.find({ del: false,status: true });

            const protocol = req.protocol; // Will be 'http' or 'https'
            const baseUrl = `${protocol}://${req.headers.host}`;

            const newsWithImageUrls = news.map(newss => {
                return {
                    ...newss._doc, // Spread the original bannerss document
                    image: newss.image ? `${baseUrl}/uploads/news/${newss.image}` : null // Append full image URL
                };
            });

            return res.status(200).json({
                status: true,
                message: "News retrieved successfully",
                data: newsWithImageUrls
            });
        } catch (error) {
            console.error("Error retrieving news:", error);
            return res.status(500).json({
                status: false,
                message: "Server error",
                error: error.message
            });
        }
    }


    async Plancategorysist(req, res) {
        try {

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


      
    async getPlansByPlancategoryId(req, res) {
      try {
        const pipeline = [
          // Match all plancategories
          {
            $match: {
              del: false,
              status: true,
            },
          },
          // Lookup to get associated plans
          {
            $lookup: {
              from: 'plans', // Collection name for plans
              let: { categoryId: '$_id' }, // Define a variable for the category ID
              pipeline: [
                // Match plans with specific category and additional filters
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ['$category', '$$categoryId'] }, // Match by category
                        { $eq: ['$status', 'active'] }, // Status must be 'active'
                        { $eq: ['$del', false] }, // del must be false
                      ],
                    },
                  },
                },
                // Calculate price per month based on validity
                {
                  $addFields: {
                    pricePerMonth: {
                      $switch: {
                        branches: [
                          { case: { $eq: ['$validity', '1 month'] }, then: { $divide: ['$price', 1] } },
                          { case: { $eq: ['$validity', '3 months'] }, then: { $divide: ['$price', 3] } },
                          { case: { $eq: ['$validity', '6 months'] }, then: { $divide: ['$price', 6] } },
                          { case: { $eq: ['$validity', '9 months'] }, then: { $divide: ['$price', 9] } },
                          { case: { $eq: ['$validity', '1 year'] }, then: { $divide: ['$price', 12] } },
                          { case: { $eq: ['$validity', '2 years'] }, then: { $divide: ['$price', 24] } },
                          { case: { $eq: ['$validity', '3 years'] }, then: { $divide: ['$price', 36] } },
                          { case: { $eq: ['$validity', '4 years'] }, then: { $divide: ['$price', 48] } },
                          { case: { $eq: ['$validity', '5 years'] }, then: { $divide: ['$price', 60] } }, // 5 years = 60 months
                        ],
                        default: '$price', // Fallback to total price if validity doesn't match
                      },
                    },
                  },
                },
                // Optionally project fields in the plans
                {
                  $project: {
                    _id: 1, // Plan ID
                    title: 1, // Plan title
                    description: 1, // Plan description
                    price: 1, // Plan price
                    validity: 1, // Plan validity
                    pricePerMonth: 1, // Price per month
                  },
                },
              ],
              as: 'plans', // Name of the array field to add
            },
          },
          // Lookup to get associated services
          {
            $lookup: {
              from: 'services', // Collection name for services
              let: { serviceIds: { $split: ['$service', ','] } }, // Split service string into array
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $in: ['$_id', { $map: { input: '$$serviceIds', as: 'id', in: { $toObjectId: '$$id' } } }],
                        },
                        { $eq: ['$status', true] }, // Status must be true
                        { $eq: ['$del', false] }, // del must be false
                      ],
                    },
                  },
                },
                // Optionally project fields in the services
                {
                  $project: {
                    _id: 1, // Service ID
                    title: 1, // Service title
                  },
                },
              ],
              as: 'services', // Name of the array field to add
            },
          },
          // Project only the necessary fields
          {
            $project: {
              title: 1, // Plancategory title
              plans: {
                _id: 1, // Plan ID
                title: 1, // Plan title
                description: 1, // Plan description
                price: 1, // Plan price
                validity: 1, // Plan validity
                pricePerMonth: 1, // Price per month
              },
              services: {
                _id: 1, // Service ID
                title: 1, // Service title
              },
            },
          },
        ];
  
        const result = await Plancategory_Modal.aggregate(pipeline);
  
        return res.json({
          status: true,
          message: "Data retrieved successfully",
          data: result,
        });
  
      } catch (error) {
        console.error(error);
        return res.json({ status: false, message: "Server error", data: [] });
      }
    }
  

async getallPlan(req, res) {
    try {
        const plans = await Plan_Modal.aggregate([
            {
                $match: { del: false, status: "active" } // Match plans where 'del' is false and status is 'active'
            },
            {
                $lookup: {
                    from: 'plancategories', // Join with plancategories collection
                    localField: 'category', // Field from the Plan_Modal
                    foreignField: '_id', // Field from the plancategories
                    as: 'category' // Name for the output array field
                }
            },
            {
                $unwind: {
                    path: '$category',
                    preserveNullAndEmptyArrays: true // If no matching category, keep the plan in the results
                }
            },
            {
                $lookup: {
                    from: 'services', // Collection name for services
                    let: { serviceIds: { $split: ['$category.service', ','] } }, // Split service string into array
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $in: ['$_id', { $map: { input: '$$serviceIds', as: 'id', in: { $toObjectId: '$$id' } } }],
                                        },
                                        { $eq: ['$status', true] }, // Match only active services
                                        { $eq: ['$del', false] }, // Match only non-deleted services
                                    ],
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 1, // Service ID
                                title: 1, // Service title
                            },
                        },
                    ],
                    as: 'services' // Name of the new array field to hold the services
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    validity: 1, 
                    price:1,
                    category: 1, // Include the category details
                    services: 1 // Include the matched services
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


   // Controller function to add a new plan subscription
   async addPlanSubscription(req, res) {
    try {
      const { plan_id, client_id, price, discount } = req.body;
  
      // Validate input
      if (!plan_id || !client_id) {
        return res.status(400).json({ status: false, message: 'Missing required fields' });
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
  
      // Create a new plan subscription record
      const newSubscription = new PlanSubscription_Modal({
        plan_id,
        client_id,
        total: plan.price,
        plan_price: price,
        discount: discount,
        plan_start: start,
        plan_end: end,
      });
  
      // Save the subscription
      const savedSubscription = await newSubscription.save();
  
      const client = await Clients_Modal.findOne({ _id: client_id, del: 0, ActiveStatus: 1 });

      if (!client) {
          return console.error('Client not found or inactive.');
      }
      
      const refertokens = await Refer_Modal.find({ user_id: client._id, status: 0 });
      if (refertokens.length > 0) {
          for (const refertoken of refertokens) {
              const senderamount = (plan.price * refertoken.senderearn) / 100;
              const receiveramount = (plan.price * refertoken.receiverearn) / 100;
      
              refertoken.senderamount = senderamount; 
              refertoken.receiveramount = receiveramount; 
              refertoken.status = 1; 
      
              await refertoken.save();
      
              // Update client's wallet amount
              client.wamount += receiveramount; 
              await client.save();
      
              // Update sender's wallet amount
              const sender = await Clients_Modal.findOne({ refer_token: refertoken.token, del: 0, ActiveStatus: 1 });
              
              if (sender) {
                  sender.wamount += senderamount; 
                  await sender.save();
              } else {
                  console.error(`Sender not found or inactive for user_id: ${refertoken.user_id}`);
              }
          }
      } else {
          console.log('No referral tokens found.');
      }

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
  
  
   // Controller function to add a new plan subscription
   async  addBasketSubscription(req, res) {
    try {
      const { basket_id, client_id, price, discount} = req.body;
      // Validate input
      if (!basket_id || !client_id ) {
        return res.status(400).json({ status: false, message: 'Missing required fields' });
      }
      const basket = await Basket_Modal.findById(basket_id).exec();
  
      // Create a new subscription
      const newSubscription = new BasketSubscription_Modal({
        basket_id,
        client_id,
        total:basket.price,
        plan_price:price,
        discount:discount
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
      console.error(error);
      return res.status(500).json({ status: false, message: 'Server error', data: [] });
    }
  }
  



async  myPlan(req, res) {
  try {
    const { id } = req.params; 
    console.log(id);

    // Validate input
    if (!id) {
      return res.status(400).json({ status: false, message: 'Client ID is required' });
    }

    
    // Fetch subscriptions based on client_id and del status
    const result = await PlanSubscription_Modal.aggregate([
  {
    $match: {
      del: false,
      client_id: new mongoose.Types.ObjectId(id) // Convert id to ObjectId if necessary
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
  }
]);
    console.log(result);
  
   

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







async Couponlist(req, res) {
  try {

    const { } = req.body;

    //const result = await Coupon_Modal.find()

    const result = await Coupon_Modal.find({ del: false,status: true });


    const protocol = req.protocol; // Will be 'http' or 'https'
    const baseUrl = `${protocol}://${req.headers.host}`;

    const resultWithImageUrls = result.map(results => {
        return {
            ...results._doc, // Spread the original bannerss document
            image: results.image ? `${baseUrl}/uploads/coupon/${results.image}` : null // Append full image URL
        };
    });

    return res.json({
      status: true,
      message: "get",
      data:resultWithImageUrls
    });

  } catch (error) {
    return res.json({ status: false, message: "Server error", data: [] });
  }
}

async Signallist(req, res) {
  try {

    const { } = req.body;

    //const result = await Coupon_Modal.find()

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

async applyCoupon (req, res) {


  try {
      const { code, purchaseValue } = req.body;
      // Find the coupon by code
      const coupon = await Coupon_Modal.findOne({ code, status: 'true', del: false });
      if (!coupon) {
          return res.status(404).json({ message: 'Coupon not found or is inactive' });
      }
      console.log('coupon-',coupon.mincouponvalue);

      // Check if the coupon is within the valid date range
      const currentDate = new Date();
      if (currentDate < coupon.startdate || currentDate > coupon.enddate) {
          return res.status(400).json({ message: 'Coupon is not valid at this time' });
      }

      // Check if the purchase meets the minimum purchase value requirement
      if (purchaseValue < coupon.minpurchasevalue) {
          return res.status(400).json({ message: `Minimum purchase value required is ${coupon.minpurchasevalue}` });
      }
      // Calculate the discount based on the coupon type
      let discount = 0;
      if (coupon.type === 'fix') {
          discount = coupon.value;
      } else if (coupon.type === 'percentage') {
          discount = (coupon.value / 100) * purchaseValue;
      }

      // Ensure the discount does not exceed the minimum coupon value
      if (discount > coupon.mincouponvalue) {
          discount = coupon.mincouponvalue;
      }

      // Calculate the final price after applying the discount
      const finalPrice = purchaseValue - discount;

      return res.status(200).json({
          message: 'Coupon applied successfully',
          originalPrice: purchaseValue,
          discount,
          finalPrice
      });
  } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
  }
}

async showSignalsToClients(req, res) {


    try {
      const { service_id, client_id } = req.body;

      // Fetch the plan that matches the serviceId and clientId
      const plans = await Planmanage.find({ serviceid: service_id, clientid: client_id });
      if (plans.length === 0) {
          return res.json({
              status: false,
              message: "No plans found for the given service and client IDs",
              data: []
          });
      }

      // Get the start and end dates from the plans
      const startDates = plans.map(plan => new Date(plan.startdate));
      const endDates = plans.map(plan => new Date(plan.enddate));
     
      const query = {
        service: service_id,
        created_at: {
            $gte: startDates[0], // Assuming all plans have the same startdate
            $lte: endDates[0] // Assuming all plans have the same enddate
        }
    };

    const signals = await Signal_Modal.find(query);

      return res.json({
          status: true,
          message: "Signals retrieved successfully",
          data: signals
      });

  } catch (error) {
      console.error("Error fetching signals:", error);
      return res.json({ status: false, message: "Server error", data: [] });
  }
}


async showSignalsToClientsClose(req, res) {
  try {
    const { service_id, client_id } = req.body;

    // Fetch the plan that matches the serviceId and clientId
    const plans = await Planmanage.find({ serviceid: service_id, clientid: client_id });

    if (plans.length === 0) {
        return res.json({
            status: false,
            message: "No plans found for the given service and client IDs",
            data: []
        });
    }

    // Get the start and end dates from the plans
    const startDates = plans.map(plan => new Date(plan.startdate));
    const endDates = plans.map(plan => new Date(plan.enddate));
   
    const query = {
      service: service_id,
      close_status: true,
      created_at: {
          $gte: startDates[0], // Assuming all plans have the same startdate
          $lte: endDates[0] // Assuming all plans have the same enddate
      }
  };

  // Print the query to the console

  // Fetch signals where createdAt is between the plan's start and end dates
  const signals = await Signal_Modal.find(query);
 
    return res.json({
        status: true,
        message: "Signals retrieved successfully",
        data: signals
    });

} catch (error) {
    console.error("Error fetching signals:", error);
    return res.json({ status: false, message: "Server error", data: [] });
}
}




async Servicelist(req, res) {
  try {

      const service = await Service_Modal.find({ del: false,status: true });
     

      return res.status(200).json({
          status: true,
          message: "Service retrieved successfully",
          data: service
      });
  } catch (error) {
      console.error("Error retrieving Service:", error);
      return res.status(500).json({
          status: false,
          message: "Server error",
          error: error.message
      });
  }
}

async Faqlist(req, res) {
  try {

      const faq = await Faq_Modal.find({ del: false,status: true });
     

      return res.status(200).json({
          status: true,
          message: "Faq retrieved successfully",
          data: faq
      });
  } catch (error) {
      console.error("Error retrieving Faq:", error);
      return res.status(500).json({
          status: false,
          message: "Server error",
          error: error.message
      });
  }
}
async detailContent(req, res) {
  try {
      // Extract ID from request parameters
      const { id } = req.params;

      // Check if ID is provided
      if (!id) {
          return res.status(400).json({
              status: false,
              message: "Content ID is required"
          });
      }

      const Content = await Content_Modal.findById(id);

      if (!Content) {
          return res.status(404).json({
              status: false,
              message: "Content not found"
          });
      }

      return res.json({
          status: true,
          message: "Content details fetched successfully",
          data: Content
      });

  } catch (error) {
      console.error("Error fetching Content details:", error);
      return res.status(500).json({
          status: false,
          message: "Server error",
          data: []
      });
  }
}

async BasketList(req, res) {
  try {

    const { clientId } = req.params;
      const baskets = await Basket_Modal.find({ del: false, status: "active" });

      // Process each basket to restructure the data
        const processedBaskets = await Promise.all(baskets.map(async (basket) => {

        const subscription = await BasketSubscription_Modal.findOne({
          basket_id: basket._id,
          client_id: clientId,
          del: false // Only check active (non-deleted) subscriptions
      });


     

          // Split the data by '##'
          const stocks = basket.stocks ? basket.stocks.split('##') : [];
          const pricerange = basket.pricerange ? basket.pricerange.split('##') : [];
          const stockweightage = basket.stockweightage ? basket.stockweightage.split('##') : [];
          const entryprice = basket.entryprice ? basket.entryprice.split('##') : [];
          const entrydate = basket.entrydate ? basket.entrydate.split('##') : [];
          const exitprice = basket.exitprice ? basket.exitprice.split('##') : [];
          const exitdate = basket.exitdate ? basket.exitdate.split('##') : [];
          const comment = basket.comment ? basket.comment.split('##') : [];
        //  const returnpercentage = basket.returnpercentage ? basket.returnpercentage.split('##') : [];
       //   const holdingperiod = basket.holdingperiod ? basket.holdingperiod.split('##') : [];
        //  const potentialleft = basket.potentialleft ? basket.potentialleft.split('##') : [];

          // Group data into objects
          const groupedData = stocks.map((stock, index) => ({
              stock: stock || null,
              pricerange: pricerange[index] || null,
              stockweightage: stockweightage[index] || null,
              entryprice: entryprice[index] || null,
              entrydate: entrydate[index] || null,
              exitprice: exitprice[index] || null,
              exitdate: exitdate[index] || null,
              comment: comment[index] || null,
           //   returnpercentage: returnpercentage[index] || null,
          //    holdingperiod: holdingperiod[index] || null,
           //   potentialleft: potentialleft[index] || null
          }));

          return {
              _id: basket._id,
              title: basket.title,
              description: basket.description,
              accuracy: basket.accuracy,
              price: basket.price,
              returnpercentage: basket.returnpercentage,
              holdingperiod: basket.holdingperiod,
              potentialleft: basket.potentialleft,
              mininvamount: basket.mininvamount,
              portfolioweightage: basket.portfolioweightage,
              themename: basket.themename,
              status: basket.status,
              add_by: basket.add_by,
              del: basket.del,
              created_at: basket.created_at,
              updated_at: basket.updated_at,
              __v: basket.__v,
              groupedData,
              purchaseStatus: subscription ? 1 : 0 
          };
        }));


      return res.json({
          status: true,
          message: "Baskets fetched successfully",
          data: processedBaskets
      });

  } catch (error) {
      console.error("Server error occurred:", error);
      return res.json({ 
          status: false, 
          message: "Server error", 
          data: [] 
      });
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

      if (!isNaN(entryPrice) && !isNaN(exitPrice)) {
        const profitOrLoss = exitPrice - entryPrice;

        if (profitOrLoss >= 0) {
          totalProfit += profitOrLoss;
          profitCount++;
        } else {
          totalLoss += Math.abs(profitOrLoss);
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
        count,
        totalProfit,
        totalLoss,
        profitCount,
        lossCount,
        accuracy,
        avgreturnpertrade,
        avgreturnpermonth
      }
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


}
module.exports = new List();