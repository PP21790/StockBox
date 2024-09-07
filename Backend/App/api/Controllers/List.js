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
                          { case: { $eq: ['$validity', '3 month'] }, then: { $divide: ['$price', 3] } },
                          { case: { $eq: ['$validity', '6 month'] }, then: { $divide: ['$price', 6] } },
                          { case: { $eq: ['$validity', '12 month'] }, then: { $divide: ['$price', 12] } },
                          { case: { $eq: ['$validity', '5 year'] }, then: { $divide: ['$price', 60] } }, // 5 years = 60 months
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
  
      
   // Controller function to add a new plan subscription
async  addPlanSubscription(req, res) {
  try {
    const { plan_id, client_id} = req.body;
    // Validate input
    if (!plan_id || !client_id ) {
      return res.status(400).json({ status: false, message: 'Missing required fields' });
    }
    const plan = await Plan_Modal.findById(plan_id).exec();

    const validityMapping = {
      '1 month': 1,
      '3 months': 3,
      '6 months': 6,
      '12 months': 12,
      '5 years': 60
    };

    const start = new Date();

    const monthsToAdd = validityMapping[plan.validity];
  
    if (monthsToAdd === undefined) {
      throw new Error('Invalid validity period');
    }
  
    const end = new Date(start);
    end.setMonth(start.getMonth() + monthsToAdd);

    

    // Create a new subscription
    const newSubscription = new PlanSubscription_Modal({
      plan_id,
      client_id,
      plan_price: plan.price,
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
    const result = await PlanSubscription_Modal.find({
      del: false,
      client_id: id
    }).exec();

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

  console.log('aaaaa');

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
    const { client_id,service_id } = req.body;
    const currentDate = new Date();

    const activePlanPurchases = await PlanSubscription_Modal.find({
      client_id: client_id,
      status: 'active',
      del: false,
      plan_start: { $lte: currentDate },
      plan_end: { $gte: currentDate }
    });

    let relevantSignals = [];

    for (let purchase of activePlanPurchases) {
      const plan = await Plan_Modal.findById(new mongoose.Types.ObjectId(purchase.plan_id));
      if (!plan) continue;

      const planCategory = await Plancategory_Modal.findById(plan.category);
      if (!planCategory) continue;

      const serviceIds = planCategory.service.split(',').map(id => {
        id = id.trim(); // Remove any extra whitespace
        if (mongoose.Types.ObjectId.isValid(id)) {
          return new mongoose.Types.ObjectId(id);
        } else {
          return null;
        }
      }).filter(id => id !== null);

      const matchingSignals = await Signal_Modal.find({  service: service_id, service: { $in: serviceIds } })
      .populate({
        path: 'stock',   // Populate the stock field
        select: 'symbol' // Select only the symbol field from the stock collection
      });

      const protocol = req.protocol; // Will be 'http' or 'https'
      const baseUrl = `${protocol}://${req.headers.host}`;
 matchingSignals.forEach(signal => {
    signal.report = `${baseUrl}/uploads/report/${signal.report}`;
  });

      relevantSignals = relevantSignals.concat(matchingSignals);
    }

    relevantSignals = [...new Map(relevantSignals.map(signal => [signal._id.toString(), signal])).values()];

    return res.status(200).json({
      message: 'Relevant signals for the client',
      signals: relevantSignals
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
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


}
module.exports = new List();