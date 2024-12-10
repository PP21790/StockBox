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
const Freetrial_Modal = db.Freetrial;
const Broadcast_Modal = db.Broadcast;
const Order_Modal = db.Order;
const License_Modal = db.License;
const Notification_Modal = db.Notification;
const Bank_Modal = db.Bank;
const Adminnotification_Modal = db.Adminnotification;
const Basketstock_Modal = db.Basketstock;
const Liveprice_Modal = db.Liveprice;
const {orderplace} = require('../../Controllers/Aliceblue');
const {angleorderplace} = require('../../Controllers/Angle')
const {kotakneoorderplace} = require('../../Controllers/Kotakneo')
const {markethuborderplace} = require('../../Controllers/Markethub')



mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


class List {


  async Bannerlist(req, res) {
    try {

      const banners = await Banner_Modal.find({ del: false, status: true });
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
      console.log("Error retrieving Banner:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message
      });
    }
  }


  async Blogslist(req, res) {
    try {

      const blogs = await Blogs_Modal.find({ del: false, status: true })
        .sort({ created_at: -1 });
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
      console.log("Error retrieving blogs:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message
      });
    }
  }


  async BlogslistwithPagination(req, res) {
    try {
      const { page = 1 } = req.query; // Default page is 1, and limit is 10
      let limit = 10;
      // Parse page and limit as integers
      const pageNumber = parseInt(page, 10);
      const pageSize = parseInt(limit, 10);

      // Ensure page and limit are valid
      if (pageNumber < 1 || pageSize < 1) {
        return res.status(400).json({
          status: false,
          message: "Invalid page or limit value. Both must be positive integers.",
        });
      }

      // Get total count of blogs
      const totalBlogs = await Blogs_Modal.countDocuments({ del: false, status: true });

      // Fetch paginated blogs
      const blogs = await Blogs_Modal.find({ del: false, status: true })
        .sort({ created_at: -1 })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);

      const protocol = req.protocol; // 'http' or 'https'
      const baseUrl = `${protocol}://${req.headers.host}`;

      const blogsWithImageUrls = blogs.map(blog => {
        return {
          ...blog._doc, // Spread the original blog document
          image: blog.image ? `${baseUrl}/uploads/blogs/${blog.image}` : null, // Append full image URL
        };
      });

      return res.status(200).json({
        status: true,
        message: "Blogs retrieved successfully",
        data: blogsWithImageUrls,
        pagination: {
          totalBlogs,
          currentPage: pageNumber,
          totalPages: Math.ceil(totalBlogs / pageSize),
          pageSize,
        },
      });
    } catch (error) {
      console.log("Error retrieving blogs:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }


  async Newslist(req, res) {




    try {

      // const news = await News_Modal.find();
      const news = await News_Modal.find({ del: false, status: true })
        .sort({ created_at: -1 });
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
      console.log("Error retrieving news:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message
      });
    }
  }


  async NewslistwithPagination(req, res) {
    try {
      const { page = 1 } = req.query; // Default page is 1, and limit is 10
      let limit = 10;
      // Parse page and limit as integers
      const pageNumber = parseInt(page, 10);
      const pageSize = parseInt(limit, 10);

      // Ensure page and limit are valid
      if (pageNumber < 1 || pageSize < 1) {
        return res.status(400).json({
          status: false,
          message: "Invalid page or limit value. Both must be positive integers.",
        });
      }

      // Get total count of news
      const totalNews = await News_Modal.countDocuments({ del: false, status: true });

      // Fetch paginated news
      const news = await News_Modal.find({ del: false, status: true })
        .sort({ created_at: -1 })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);

      const protocol = req.protocol; // 'http' or 'https'
      const baseUrl = `${protocol}://${req.headers.host}`;

      const newsWithImageUrls = news.map(newss => {
        return {
          ...newss._doc, // Spread the original news document
          image: newss.image ? `${baseUrl}/uploads/news/${newss.image}` : null, // Append full image URL
        };
      });

      return res.status(200).json({
        status: true,
        message: "News retrieved successfully",
        data: newsWithImageUrls,
        pagination: {
          totalNews,
          currentPage: pageNumber,
          totalPages: Math.ceil(totalNews / pageSize),
          pageSize,
        },
      });
    } catch (error) {
      console.log("Error retrieving news:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }


  async Plancategorysist(req, res) {
    try {

      const result = await Plancategory_Modal.find({ del: false, status: true });

      return res.json({
        status: true,
        message: "get",
        data: result
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
                    $cond: {
                      if: { $ne: ['$validity', null] }, // Check if validity is not null
                      then: {
                        $divide: [
                          '$price', // Total price
                          {
                            $switch: {
                              branches: [
                                { case: { $eq: ['$validity', '1 month'] }, then: 1 },
                                { case: { $eq: ['$validity', '3 months'] }, then: 3 },
                                { case: { $eq: ['$validity', '6 months'] }, then: 6 },
                                { case: { $eq: ['$validity', '9 months'] }, then: 9 },
                                { case: { $eq: ['$validity', '1 year'] }, then: 12 },
                                { case: { $eq: ['$validity', '2 years'] }, then: 24 },
                                { case: { $eq: ['$validity', '3 years'] }, then: 36 },
                                { case: { $eq: ['$validity', '4 years'] }, then: 48 },
                                { case: { $eq: ['$validity', '5 years'] }, then: 60 },
                              ],
                              default: 1, // Default to 1 month if validity doesn't match
                            },
                          },
                        ],
                      },
                      else: '$price', // If no validity is specified, fallback to the full price
                    },
                  },
                },
              },
              // Sort by pricePerMonth or validity for ascending order
              {
                $sort: { pricePerMonth: 1 }, // Sorting by price per month in ascending order
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
      console.log(error);
      return res.json({ status: false, message: "Server error", data: [] });
    }
  }


  async getallPlan(req, res) {
    try {
      const plans = await Plan_Modal.aggregate([
        {
          $match: { del: false, status: "active" }
        },
        {
          $lookup: {
            from: 'plancategories',
            let: { categoryId: { $toObjectId: '$category' } }, // Ensure category is cast to ObjectId
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$_id', '$$categoryId'] },
                      { $eq: ['$del', false] },
                      { $eq: ['$status', true] }
                    ]
                  }
                }
              }
            ],
            as: 'category'
          }
        },
        {
          $unwind: {
            path: '$category',
            preserveNullAndEmptyArrays: false // Exclude plans with no matching category
          }
        },
        {
          $lookup: {
            from: 'services',
            let: { serviceIds: { $split: ['$category.service', ','] } },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $in: ['$_id', { $map: { input: '$$serviceIds', as: 'id', in: { $toObjectId: '$$id' } } }],
                      },
                      { $eq: ['$status', true] },
                      { $eq: ['$del', false] }
                    ]
                  }
                }
              },
              {
                $project: {
                  _id: 1,
                  title: 1
                }
              }
            ],
            as: 'services'
          }
        },
        {
          $addFields: {
            validityValue: {
              $switch: {
                branches: [
                  { case: { $eq: ['$validity', '1 month'] }, then: 1 },
                  { case: { $eq: ['$validity', '3 months'] }, then: 3 },
                  { case: { $eq: ['$validity', '6 months'] }, then: 6 },
                  { case: { $eq: ['$validity', '9 months'] }, then: 9 },
                  { case: { $eq: ['$validity', '1 year'] }, then: 12 },
                  { case: { $eq: ['$validity', '2 years'] }, then: 24 },
                  { case: { $eq: ['$validity', '3 years'] }, then: 36 },
                  { case: { $eq: ['$validity', '4 years'] }, then: 48 },
                  { case: { $eq: ['$validity', '5 years'] }, then: 60 }
                ],
                default: 0
              }
            }
          }
        },
        {
          $sort: { validityValue: 1 }
        },
        {
          $project: {
            _id: 1,
            title: 1,
            validity: 1,
            price: 1,
            category: 1,
            services: 1
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
      const { plan_id, client_id, price, discount, orderid, coupon } = req.body;

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
              {
                $set: {
                  enddate: existingPlan.enddate,  // Set the new end date
                  startdate: existingPlan.startdate // Set the new start date
                }
              }  // Update fields
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
            serviceid: serviceId,
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
                monthsToAdd = Math.ceil(differenceInMonths); // Round up to the nearest whole number
              } else {
                monthsToAdd = Math.floor(differenceInMonths); // Round down to the nearest whole number
              }

            }
            else {
              monthsToAdd = 0;
            }
          }




          ////////////////// 17/10/2024 ////////////////////////


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
        console.log('Month found, updating noofclient.', monthsToAdd);
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
        total: price,
        plan_price: plan.price,
        discount: discount,
        coupon: coupon,
        plan_start: start,
        plan_end: end,
        validity: plan.validity,
        orderid: orderid
      });

      // Save the subscription
      const savedSubscription = await newSubscription.save();

      if (coupon) {
        const resultc = await Coupon_Modal.find({
          del: false,
          status: true,
          startdate: { $lte: endOfToday },
          enddate: { $gte: startOfToday },
          code: coupon
        });


        if (resultc) {
          // Check if limitation is greater than 0 before decrementing
          if (resultc.limitation > 0) {
            const updatedResult = await Coupon_Modal.findByIdAndUpdate(
              resultc._id,
              { $inc: { limitation: -1 } }, // Decrease limitation by 1
              { new: true } // Return the updated document
            );
            console.log('Updated Coupon:', updatedResult);
          }

        }
      }

      const client = await Clients_Modal.findOne({ _id: client_id, del: 0, ActiveStatus: 1 });


      if (!client) {
        return console.error('Client not found or inactive.');
      }


      if (client.freetrial == 0) {
        client.freetrial = 1;
        await client.save();
      }




      const refertokens = await Refer_Modal.find({ user_id: client._id, status: 0 });

      if (client.refer_status && client.token) {
        if (refertokens.length > 0) {
        }
        else {
          const settings = await BasicSetting_Modal.findOne();

          const senderamount = (price * settings.sender_earn) / 100;
          const receiveramount = (price * settings.receiver_earn) / 100;



          const results = new Refer_Modal({
            token: client.token,
            user_id: client._id,
            senderearn: settings.sender_earn,
            receiverearn: settings.receiver_earn,
            senderamount: senderamount,
            receiveramount: receiveramount,
            status: 1
          })
          await results.save();

          client.wamount += receiveramount;
          await client.save();
          const sender = await Clients_Modal.findOne({ refer_token: client.token, del: 0, ActiveStatus: 1 });

          if (sender) {
            sender.wamount += senderamount;
            await sender.save();
          } else {
            console.error(`Sender not found or inactive for user_id: ${refertoken.user_id}`);
          }

        }


      }


      if (refertokens.length > 0) {
        for (const refertoken of refertokens) {
          const senderamount = (price * refertoken.senderearn) / 100;
          const receiveramount = (price * refertoken.receiverearn) / 100;

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


      const adminnotificationTitle = "Important Update";
      const adminnotificationBody = `Congratulations! ${client.FullName} successfully purchased the ${plan.category.title} Plan`;
      const resultnm = new Adminnotification_Modal({
        clientid: client._id,
        segmentid: savedSubscription._id,
        type: 'plan purchase',
        title: adminnotificationTitle,
        message: adminnotificationBody
      });


      await resultnm.save();



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
  async addBasketSubscription(req, res) {
    try {
      const { basket_id, client_id, price, discount, orderid, coupon } = req.body;

      // Validate input
      if (!basket_id || !client_id) {
        return res.status(400).json({ status: false, message: 'Missing required fields' });
      }
      const basket = await Basket_Modal.findOne({
        _id: basket_id,
        del: false
      });



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
        '5 years': 60,
      };

      const monthsToAdd = validityMapping[basket.validity];
      if (monthsToAdd === undefined) {
        return res.status(400).json({ status: false, message: 'Invalid plan validity period' });
      }

      const start = new Date();
      const end = new Date(start);
      end.setHours(23, 59, 59, 999);  // Set end date to the end of the day
      end.setMonth(start.getMonth() + monthsToAdd);  // Add the plan validity duration



      // Create a new subscription
      const newSubscription = new BasketSubscription_Modal({
        basket_id,
        client_id,
        total: price,
        plan_price: basket.basket_price,
        discount: discount,
        coupon: coupon,
        startdate: start,
        enddate: end,
        validity: basket.validity,
        orderid: orderid
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





  async myBasketPlan(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ status: false, message: 'Client ID is required' });
      }

      const result = await BasketSubscription_Modal.aggregate([
        {
          $match: {
            del: false,
            client_id: new mongoose.Types.ObjectId(id) // Ensure id is converted to ObjectId
          }
        },
        {
          $lookup: {
            from: 'baskets', // Replace with the actual collection name
            localField: 'basket_id', // Field in BasketSubscription_Modal
            foreignField: '_id', // Field in Basket
            as: 'basketDetails' // Resulting field name
          }
        },
        {
          $unwind: '$basketDetails' // Flatten the structure
        },
        {
          $project: {
            _id: 1, // Include the _id of BasketSubscription_Modal
            basket_id:1,
            client_id:1,
             plan_price:1,
            total:1,
            orderid:1,
            coupon:1,
            startdate:1,
            enddate:1,
            validity:1,
            'basketDetails.title': 1, 
            'basketDetails.description': 1,
            'basketDetails.mininvamount': 1
          }
        }
      ]);



      return res.json({
        status: true,
        message: "Subscriptions retrieved successfully",
        data: result
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, message: 'Server error', data: [] });
    }
  }





  async myPlan(req, res) {
    try {
      const { id } = req.params;


      // Validate input
      if (!id) {
        return res.status(400).json({ status: false, message: 'Client ID is required' });
      }


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
          $unwind: '$planDetails' // Unwind to get a flat structure for planDetails
        },
        {
          $lookup: {
            from: 'plancategories', // The name of the plan categories collection
            localField: 'planDetails.category', // Assuming planDetails has a field called category
            foreignField: '_id', // The field in the planCategories collection
            as: 'categoryDetails' // The name of the field for category data
          }
        },
        {
          $unwind: '$categoryDetails' // Unwind to get a flat structure for categoryDetails
        },
        {
          $lookup: {
            from: 'services', // Collection name for services
            let: { serviceIds: { $split: ['$categoryDetails.service', ','] } }, // Split service string into array
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
            as: 'serviceDetails' // Name of the new array field to hold the services
          }
        },
        {
          $unwind: {
            path: '$serviceDetails', // Unwind to get a flat structure for serviceDetails
            preserveNullAndEmptyArrays: true // Optionally preserve empty arrays if there are no services
          }
        },
        // Grouping to aggregate service titles into an array
        {
          $group: {
            _id: '$_id', // Group by the PlanSubscription's ID
            plan_id: { $first: '$plan_id' }, // Keep the original plan_id
            plan_price: { $first: '$plan_price' }, // Keep the plan_price
            total: { $first: '$total' }, // Keep the total
            discount: { $first: '$discount' }, // Keep the discount
            plan_start: { $first: '$plan_start' }, // Keep the plan_start
            plan_end: { $first: '$plan_end' },
            orderid: { $first: '$orderid' }, // Keep the plan_end
            planDetails: { $first: '$planDetails' }, // First instance of planDetails
            categoryDetails: { $first: '$categoryDetails' }, // First instance of categoryDetails
            serviceNames: { $push: '$serviceDetails.title' }
          }
        },

        {
          $sort: {
            plan_end: -1
          }
        },

        {
          $project: {
            _id: 1, // Plan Subscription ID
            plan_id: 1, // Original plan_id
            plan_price: 1, // Plan price
            total: 1, // Total
            discount: 1, // Discount
            plan_start: 1, // Plan start date
            plan_end: 1,
            orderid: 1, // Plan end date
            planDetails: 1, // Details from the plans collection
            categoryDetails: 1, // Details from the plan categories collection
            serviceNames: 1, // All service titles
            categoryDetails: {
              title: 1 // Include only the title from the category details
            },
          }
        }
      ]);



      // Fetch subscriptions based on client_id and del status
      //     const result = await PlanSubscription_Modal.aggregate([
      //   {
      //     $match: {
      //       del: false,
      //       client_id: new mongoose.Types.ObjectId(id) // Convert id to ObjectId if necessary
      //     }
      //   },
      //   {
      //     $lookup: {
      //       from: 'plans', // The name of the plans collection
      //       localField: 'plan_id', // The field in PlanSubscription_Modal that references the plans
      //       foreignField: '_id', // The field in the plans collection that is referenced
      //       as: 'planDetails' // The name of the field in the result that will hold the joined data
      //     }
      //   },
      //   {
      //     $unwind: '$planDetails' // Optional: Unwind the result if you expect only one matching plan per subscription
      //   }
      // ]);


      // Respond with the retrieved subscriptions
      return res.json({
        status: true,
        message: "Subscriptions retrieved successfully",
        data: result
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, message: 'Server error', data: [] });
    }
  }



  async Couponlist(req, res) {
    try {



      const { } = req.body;

      //const result = await Coupon_Modal.find()

      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999);

      const result = await Coupon_Modal.find({
        del: false,
        status: true,
        showstatus: 1,
        startdate: { $lte: endOfToday },
        enddate: { $gte: startOfToday }
      });

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
        data: resultWithImageUrls
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
        data: result
      });

    } catch (error) {
      return res.json({ status: false, message: "Server error", data: [] });
    }
  }

  async applyCoupon(req, res) {


    try {
      const { code, purchaseValue, planid } = req.body;
      // Find the coupon by code
      const coupon = await Coupon_Modal.findOne({ code, status: 'true', del: false });
      if (!coupon) {
        return res.status(404).json({ message: 'Coupon not found or is inactive' });
      }




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
      if (coupon.type === 'fixed') {
        discount = coupon.value;
      } else if (coupon.type === 'percentage') {
        discount = (coupon.value / 100) * purchaseValue;
      }

      if (discount > purchaseValue) {
        return res.status(400).json({ message: "Discount should be less than the purchase value." });
      }


      if (coupon.limitation <= 0) {
        return res.status(400).json({ message: 'Coupon usage limit has been reached' });
      }



      if (!coupon.service) {
        const plan = await Plan_Modal.findById(planid)
          .populate('category')
          .exec();
        if (!coupon.service != plan.category.service) {

          return res.status(404).json({ message: 'Service Does not match' });
        }
      }

      // Ensure the discount does not exceed the minimum coupon value

      if (coupon.mincouponvalue) {
        if (discount > coupon.mincouponvalue) {
          discount = coupon.mincouponvalue;
        }
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
      const { service_id, client_id, search, page = 1 } = req.body;
      const limit = 10;
      const skip = (parseInt(page) - 1) * parseInt(limit); // Calculate how many items to skip
      const limitValue = parseInt(limit); // Items per page

      const plans = await Planmanage.find({ serviceid: service_id, clientid: client_id });
      if (plans.length === 0) {
        return res.json({
          status: false,
          message: "No plans found for the given service and client IDs",
          data: []
        });
      }

      const startDates = plans.map(plan => new Date(plan.startdate));
      const endDates = plans.map(plan => new Date(plan.enddate));

      const query = {
        service: service_id,
        close_status: false,
        created_at: {
          $gte: startDates[0], // Assuming all plans have the same startdate
          $lte: endDates[0] // Assuming all plans have the same enddate
        }
      };

      // const signals = await Signal_Modal.find(query);

      const protocol = req.protocol; // Will be 'http' or 'https'

      const baseUrl = `${protocol}://${req.headers.host}`; // Construct the base URL



      if (search && search.trim() !== '') {
        query.$or = [
          { tradesymbol: { $regex: search, $options: 'i' } },
          { calltype: { $regex: search, $options: 'i' } },
          { price: { $regex: search, $options: 'i' } },
          { closeprice: { $regex: search, $options: 'i' } }
        ];
      }



      // const signals = await Signal_Modal.find(query).lean(); // Use lean() to return plain JavaScript objects
      const signals = await Signal_Modal.find(query)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limitValue)
        .lean();
      /*
         const signalsWithReportUrls = signals.map(signal => {
      
          return {
              ...signal,
              report_full_path: signal.report ? `${baseUrl}/uploads/report/${signal.report}` : null 
          };
      });
      */


      const totalSignals = await Signal_Modal.countDocuments(query);

      const signalsWithReportUrls = await Promise.all(signals.map(async (signal) => {
        // Check if the signal was bought by the client
        const order = await Order_Modal.findOne({
          clientid: client_id,
          signalid: signal._id
        }).lean();


        /*
        
        let lot = 0;
        let tradesymbol ="";
        if(signal.segment != "C")
        {
          if(signal.segment == "F")
            {
          const lots = await Stock_Modal.findOne({
            segment: signal.segment,
            expiry: signal.expirydate,
            symbol: signal.stock
          });
          lot = lots.lotsize;
          tradesymbol = lots.tradesymbol;
        }
        else
        {
          const query = Stock_Modal.findOne({
            segment: signal.segment,
            expiry: signal.expirydate,
            symbol: signal.stock,
            strike: signal.strikeprice,
           
          });
          
          const lots = await query.exec();
          lot = lots.lotsize;
          tradesymbol = lots.tradesymbol;
        }
        }
        */



        return {
          ...signal,
          report_full_path: signal.report ? `${baseUrl}/uploads/report/${signal.report}` : null, // Append full report URL
          purchased: order ? true : false,

          //  lot: lot,
          //  tradesymbol: tradesymbol,
          order_quantity: order ? order.quantity : 0
        };
      }));


      return res.json({
        status: true,
        message: "Signals retrieved successfully",
        data: signalsWithReportUrls,
        pagination: {
          total: totalSignals,
          page: parseInt(page), // Current page
          limit: parseInt(limit), // Items per page
          totalPages: Math.ceil(totalSignals / limit), // Total number of pages
        }
      });

    } catch (error) {
      console.error("Error fetching signals:", error);
      return res.json({ status: false, message: "Server error", data: [] });
    }
  }


  async showSignalsToClientsCloses(req, res) {
    try {

      const { service_id, client_id, search, page = 1 } = req.body;
      const limit = 10;
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const limitValue = parseInt(limit);


      const plans = await Planmanage.find({ serviceid: service_id, clientid: client_id });
      if (plans.length === 0) {
        return res.json({
          status: false,
          message: "No plans found for the given service and client IDs",
          data: []
        });
      }

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

      // const signals = await Signal_Modal.find(query);

      const protocol = req.protocol; // Will be 'http' or 'https'

      const baseUrl = `${protocol}://${req.headers.host}`; // Construct the base URL


      if (search && search.trim() !== '') {
        query.$or = [
          { tradesymbol: { $regex: search, $options: 'i' } },
          { calltype: { $regex: search, $options: 'i' } },
          { price: { $regex: search, $options: 'i' } },
          { closeprice: { $regex: search, $options: 'i' } }
        ];
      }



      // const signals = await Signal_Modal.find(query).lean(); // Use lean() to return plain JavaScript objects
      const signals = await Signal_Modal.find(query)
        .sort({ closedate: -1 })
        .skip(skip)
        .limit(limitValue)
        .lean();
      /*
       const signalsWithReportUrls = signals.map(signal => {
      
        return {
            ...signal,
            report_full_path: signal.report ? `${baseUrl}/uploads/report/${signal.report}` : null 
        };
      });
      */

      const totalSignals = await Signal_Modal.countDocuments(query);


      const signalsWithReportUrls = await Promise.all(signals.map(async (signal) => {
        // Check if the signal was bought by the client
        const order = await Order_Modal.findOne({
          clientid: client_id,
          signalid: signal._id
        }).lean();



        /*
        
        let lot = 0;
        let tradesymbol ="";
        if(signal.segment != "C")
        {
        if(signal.segment == "F")
          {
        const lots = await Stock_Modal.findOne({
          segment: signal.segment,
          expiry: signal.expirydate,
          symbol: signal.stock
        });
        lot = lots.lotsize;
        tradesymbol = lots.tradesymbol;
        }
        else
        {
        const query = Stock_Modal.findOne({
          segment: signal.segment,
          expiry: signal.expirydate,
          symbol: signal.stock,
          strike: signal.strikeprice,
         
        });
        
        const lots = await query.exec();
        lot = lots.lotsize;
        tradesymbol = lots.tradesymbol;
        }
        }
        */

        const orders = await Order_Modal.find({
          clientid: client_id,
          signalid: signal._id
        }).lean();  // .lean() to return plain JavaScript objects

        // Sum the quantity field from the orders
        const totalQuantity = orders.reduce((sum, order) => sum + order.quantity, 0);
        return {
          ...signal,
          report_full_path: signal.report ? `${baseUrl}/uploads/report/${signal.report}` : null, // Append full report URL
          purchased: order ? true : false,
          //  lot: lot,
          //  tradesymbol: tradesymbol,
          order_quantity: totalQuantity ? totalQuantity : 0
        };
      }));




      return res.json({
        status: true,
        message: "Signals retrieved successfully",
        data: signalsWithReportUrls,
        pagination: {
          total: totalSignals,
          page: parseInt(page), // Current page
          limit: parseInt(limit), // Items per page
          totalPages: Math.ceil(totalSignals / limit), // Total number of pages
        }
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
        data: signals,
        pagination: {
          total: totalSignals,
          page: parseInt(page), // Current page
          limit: parseInt(limit), // Items per page
          totalPages: Math.ceil(totalSignals / limit), // Total number of pages
        }
      });

    } catch (error) {
      console.error("Error fetching signals:", error);
      return res.json({ status: false, message: "Server error", data: [] });
    }
  }




  async CloseSignal(req, res) {
    try {
      const { service_id, search, page = 1 } = req.body;

      const limit = 15;
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const limitValue = parseInt(limit);


      const query = {
        service: service_id,
        close_status: true,
      };

      if (search && search.trim() !== '') {
        query.$or = [
          { tradesymbol: { $regex: search, $options: 'i' } },
          { calltype: { $regex: search, $options: 'i' } },
          { price: { $regex: search, $options: 'i' } },
          { closeprice: { $regex: search, $options: 'i' } }
        ];
      }

      // Fetch signals and sort by createdAt in descending order
      const signals = await Signal_Modal.find(query).sort({ created_at: -1 })
        .skip(skip)
        .limit(limitValue)
        .lean();


      const totalSignals = await Signal_Modal.countDocuments(query);


      return res.json({
        status: true,
        message: "Signals retrieved successfully",
        data: signals,
        pagination: {
          total: totalSignals,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(totalSignals / limit),
        }
      });
    } catch (error) {
      console.error("Error fetching signals:", error);
      return res.json({ status: false, message: "Server error", data: [] });
    }
  }


  async Servicelist(req, res) {
    try {

      const service = await Service_Modal.find({ del: false, status: true });


      return res.status(200).json({
        status: true,
        message: "Service retrieved successfully",
        data: service
      });
    } catch (error) {
      console.log("Error retrieving Service:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message
      });
    }
  }

  async Faqlist(req, res) {
    try {

      const faq = await Faq_Modal.find({ del: false, status: true });


      return res.status(200).json({
        status: true,
        message: "Faq retrieved successfully",
        data: faq
      });
    } catch (error) {
      console.log("Error retrieving Faq:", error);
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
      console.log("Error fetching Content details:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        data: []
      });
    }
  }



  async BasketLists(req, res) {
    try {

      const baskets = await Basket_Modal.find({ del: false, status: true });

      return res.json({
        status: true,
        message: "Baskets fetched successfully",
        data: baskets
      });

    } catch (error) {
      return res.json({
        status: false,
        message: "Server error",
        data: []
      });
    }
  }



  async BasketstockList(req, res) {
    try {

      const { id } = req.params;
      const basketstock = await Basketstock_Modal.find({ del: false, status: 1, basket_id: id });

      return res.json({
        status: true,
        message: "Basket Stock fetched successfully",
        data: basketstock
      });

    } catch (error) {
      return res.json({
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
      console.log("Server error occurred:", error);
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

            if (id == "66dfede64a88602fbbca9b72" || id == "66dfeef84a88602fbbca9b79") {
              totalProfit += profitOrLoss * signal.lotsize;
            }
            else {
              totalProfit += profitOrLoss;
            }
            profitCount++;
          } else {

            if (id == "66dfede64a88602fbbca9b72" || id == "66dfeef84a88602fbbca9b79") {
              totalLoss += Math.abs(profitOrLoss) * signal.lotsize;
            }
            else {
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


  async addFreeTrail(req, res) {
    try {
      const { client_id } = req.body;
      // Validate input


      if (!client_id) {
        return res.status(400).json({ status: false, message: 'Missing required fields' });
      }
      const client = await Clients_Modal.findOne({ _id: client_id, del: 0, ActiveStatus: 1 });

      if (!client) {
        return console.error('Client not found or inactive.');
      }


      const settings = await BasicSetting_Modal.findOne();
      if (!settings || !settings.freetrial) {
        throw new Error('SMTP settings are not configured or are disabled');
      }

      const freetrialDays = parseInt(settings.freetrial, 10); // or you can use +settings.freetrial

      const start = new Date();
      const end = new Date(start);
      end.setDate(start.getDate() + freetrialDays);  // Add 7 days to the start date
      end.setHours(23, 59, 59, 999);


      const existingPlan = await Planmanage.findOne({ clientid: client_id }).exec();

      if (existingPlan) {
        return res.status(500).json({ status: false, message: 'Sorry, you are not eligible for a free trial', data: [] });
      } else {

        const service = await Service_Modal.find({ del: false });
        // Create an array to hold promises for saving the plans
        const savePromises = service.map(async (svc) => {
          // Create a new plan management record
          const newPlanManage = new Planmanage({
            clientid: client_id,
            serviceid: svc._id,
            startdate: start,
            enddate: end,
          });

          // Save the new plan management record to the database
          return newPlanManage.save(); // Return the promise from save
        });

        // Create a new plan subscription record

      }

      const newSubscription = new Freetrial_Modal({
        clientid: client_id,
        startdate: start,
        enddate: end,
      });

      const savedSubscription = await newSubscription.save();
      // Save the subscription
      client.freetrial = 1;
      await client.save();

      return res.status(201).json({
        status: true,
        message: 'Free trail Actived successfully',
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Server error', data: [] });
    }
  }


  async BroadcastList(req, res) {
    try {
      const { id } = req.body; // Extract id from request body
      const currentDate = new Date();

      // Step 1: Find services from Planmanage for the client
      const plans = await Planmanage.find({
        clientid: id,
        startdate: { $lte: currentDate },
        enddate: { $gte: currentDate }
      }, 'serviceid'); // Only fetch the 'serviceid' field

      if (!plans.length) {
        return res.status(404).json({ status: false, message: "No plans found for this client." });
      }

      // Extract service IDs from plans
      const serviceIds = plans.map(plan => plan.serviceid); // Use serviceid

      if (!serviceIds.length) {
        return res.status(404).json({ status: false, message: "No services associated with the client's plans." });
      }

      // Create a regex pattern to match any of the service IDs
      const regexPattern = serviceIds.join('|'); // Join IDs with '|'

      // Step 2: Find broadcasts matching any of the service IDs
      const query = {
        del: false,
        status: true,
        service: { $regex: new RegExp(regexPattern, 'i') } // Case-insensitive regex match
      };

      // Execute the query to find matching broadcasts
      const broadcasts = await Broadcast_Modal.find(query).sort({ created_at: -1 });

      // Remove duplicates from the broadcasts array
      const uniqueBroadcasts = Array.from(new Set(broadcasts.map(b => b._id))).map(id => {
        return broadcasts.find(b => b._id === id);
      });

      console.log("Unique Broadcasts found:", uniqueBroadcasts); // Log unique matching broadcasts

      if (!uniqueBroadcasts.length) {
        return res.status(404).json({ status: false, message: "No matching broadcasts found." });
      }

      // Return the matching broadcasts
      return res.status(200).json({ status: true, data: uniqueBroadcasts });

    } catch (error) {
      console.error("Error fetching broadcasts:", error);
      return res.status(500).json({ status: false, message: "Internal server error" });
    }
  }


  async myFreetrial(req, res) {
    try {
      const { id } = req.params;

      // Validate input
      if (!id) {
        return res.status(400).json({ status: false, message: 'Client ID is required' });
      }


      const result = await Freetrial_Modal.find({ clientid: id }).exec();

      const today = new Date();

      // Add `status` field based on `enddate`
      const updatedResult = result.map(item => {
        const status = item.enddate && new Date(item.enddate) >= today ? "active" : "expired";
        return {
          ...item.toObject(), // Convert the Mongoose document to a plain object
          status, // Add the new status field
        };
      });
      // Respond with the retrieved subscriptions and client details
      return res.json({
        status: true,
        message: "Subscriptions and client details retrieved successfully",
        data: updatedResult
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Server error', data: [] });
    }
  }




  async basicSetting(req, res) {
    try {


      const protocol = req.protocol; // Will be 'http' or 'https'
      const baseUrl = `${protocol}://${req.headers.host}`;



      const result = await BasicSetting_Modal.find({ _id: "66bb3c19542b26b6357bbf4f" })
        .select('freetrial website_title logo contact_number address refer_image receiver_earn refer_title sender_earn refer_description razorpay_key	razorpay_secret kyc paymentstatus officepaymenystatus facebook instagram twitter youtube')
        .exec();

      if (result.length > 0) {
        result[0].logo = `${baseUrl}/uploads/basicsetting/${result[0].logo}`;
        result[0].refer_image = `${baseUrl}/uploads/basicsetting/${result[0].refer_image}`;
      }






      return res.json({
        status: true,
        message: "details retrieved successfully",
        data: result
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Server error', data: [] });
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

              if (serviceId == "66dfede64a88602fbbca9b72" || serviceId == "66dfeef84a88602fbbca9b79") {
                totalProfit += profitOrLoss * signal.lotsize;
              }
              else {
                totalProfit += profitOrLoss;
              }
              profitCount++;
            } else {
              if (serviceId == "66dfede64a88602fbbca9b72" || serviceId == "66dfeef84a88602fbbca9b79") {
                totalLoss += Math.abs(profitOrLoss) * signal.lotsize;
              }
              else {
                totalLoss += Math.abs(profitOrLoss);
              }
              lossCount++;
            }
          }


        });

        const accuracy = (profitCount / count) * 100;
        let avgreturnpertrade = 0;


        avgreturnpertrade = (totalProfit - totalLoss) / count;


        console.log("avgreturnpertrade", avgreturnpertrade);

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





  async myService(req, res) {
    try {
      const { id } = req.params;

      // Validate input
      if (!id) {
        return res.status(400).json({ status: false, message: 'Client ID is required' });
      }


      const result = await Planmanage.aggregate([
        {
          $match: { clientid: id }
        },
        {
          $addFields: {
            serviceid: { $toObjectId: '$serviceid' } // Convert serviceid to ObjectId for matching
          }
        },
        {
          $lookup: {
            from: 'services',           // The name of the Service collection
            localField: 'serviceid',    // Field in Planmanage
            foreignField: '_id',        // Field in Service
            as: 'serviceDetails'        // Output array field
          }
        },
        {
          $unwind: {
            path: '$serviceDetails',
            preserveNullAndEmptyArrays: true // If there's no matching service, it won't remove the document
          }
        },
        {
          $project: {
            _id: 1,
            clientid: 1,
            serviceid: 1,
            startdate: 1,
            enddate: 1,
            serviceName: '$serviceDetails.title' // Rename the service name field for clarity
          }
        }
      ]);

      // Debug output for troubleshooting
      console.log('Aggregated Result:', result);



      // Respond with the retrieved subscriptions and client details
      return res.json({
        status: true,
        message: "Subscriptions and client details retrieved successfully",
        data: result
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Server error', data: [] });
    }
  }




  // async Notification(req, res) {
  //   try {
  //     const { id } = req.params;
  //     //  const result = await Notification_Modal.find({ clientid: id }).sort({ createdAt: -1 });
  //     const today = new Date();

  //     // Fetch active plans for the client
  //     const activePlans = await Planmanage.find({
  //       clientid: id,
  //       enddate: { $gte: today }
  //     }).select('serviceid');

  //     const activeServiceIds = activePlans.map(plan => plan.serviceid);

  //     // Query to fetch notifications
  //     const result = await Notification_Modal.find({
  //       $or: [
  //         // Notifications specific to the client
  //         { clientid: id },
  //         // Global notifications (null clientid)
  //         {
  //           clientid: null,
  //           $or: [
  //             // Global notifications with type `close signal` or `open signal`
  //             {
  //               type: { $in: ['close signal', 'open signal'] },
  //               segmentid: { $in: activeServiceIds } // Match serviceid with active plans
  //             },
  //             // Global notifications with other types
  //             { type: { $nin: ['close signal', 'open signal'] } }
  //           ]
  //         },
  //         // Broadcast notifications
  //         {
  //           clienttype: {
  //             $in: [
  //               'active', // Active clients
  //               'expired', // Expired clients
  //               'no subscribe', // Clients without a subscription
  //               'all' // All clients
  //             ]
  //           },
  //           $or: [
  //             // For 'active' type, ensure the client has active plans
  //             { clienttype: 'active', segmentid: { $in: activeServiceIds } },
  //             // For 'expired' type, check for expired plans
  //             { 
  //               clienttype: 'expired', 
  //               segmentid: { 
  //                 $in: await Planmanage.find({
  //                   clientid: id,
  //                   enddate: { $lt: today } // Expired plans
  //                 }).distinct('serviceid') 
  //               }
  //             },
  //             // For 'no subscribe', ensure the client has no plans
  //             {
  //               clienttype: 'nonsubscribe',
  //               segmentid: { 
  //                 $nin: await Planmanage.find({ clientid: id }).distinct('serviceid') 
  //               }
  //             },
  //             // 'all' type applies to all clients
  //             { clienttype: 'all' }
  //           ]
  //         }
  //       ]
  //     }).sort({ createdAt: -1 });


  //       return res.json({
  //         status: true,
  //         message: "get",
  //         data:result
  //       });

  //     } catch (error) {
  //       return res.json({ status: false, message: "Server error", data: [] });
  //     }
  // }



  async Notification(req, res) {
    try {
      const { id } = req.params;
      const { page = 1 } = req.query; // Default values for page and limit
      let limit = 10;

      const today = new Date();



      // Fetch the client's creation date
      const client = await Clients_Modal.findById(id).select('createdAt');
      if (!client) {
        return res.status(404).json({ status: false, message: "Client not found" });
      }
      const clientCreatedAt = client.createdAt;

      const activePlans = await Planmanage.find({
        clientid: id,
        enddate: { $gte: today }
      }).select('serviceid');

      const activeServiceIds = activePlans.map(plan => plan.serviceid);

      // Query to fetch notifications
      const result = await Notification_Modal.find({
        createdAt: { $gte: clientCreatedAt }, // Only notifications created after the client's creation date
        $or: [
          // Notifications specific to the client
          { clientid: id },
          // Global notifications (null clientid)
          {
            clientid: null,
            $or: [
              // Global notifications with type `close signal` or `open signal`
              {
                type: { $in: ['close signal', 'open signal'] },
                segmentid: { $in: activeServiceIds } // Match serviceid with active plans
              },
              // Global notifications with other types
              { type: { $nin: ['close signal', 'open signal'] } }
            ]
          },
          // Broadcast notifications
          {
            clienttype: {
              $in: [
                'active', // Active clients
                'expired', // Expired clients
                'no subscribe', // Clients without a subscription
                'all' // All clients
              ]
            },
            $or: [
              // For 'active' type, ensure the client has active plans
              { clienttype: 'active', segmentid: { $in: activeServiceIds } },
              // For 'expired' type, check for expired plans
              {
                clienttype: 'expired',
                segmentid: {
                  $in: await Planmanage.find({
                    clientid: id,
                    enddate: { $lt: today } // Expired plans
                  }).distinct('serviceid')
                }
              },
              // For 'no subscribe', ensure the client has no plans
              {
                clienttype: 'nonsubscribe',
                segmentid: {
                  $nin: await Planmanage.find({ clientid: id }).distinct('serviceid')
                }
              },
              // 'all' type applies to all clients
              { clienttype: 'all' }
            ]
          }
        ]
      })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit) // Skip records for pagination
        .limit(parseInt(limit)); // Limit the number of records returned

      // Total count for pagination
      const totalCount = await Notification_Modal.countDocuments({
        createdAt: { $gte: clientCreatedAt }, // Only notifications created after the client's creation date
        $or: [
          { clientid: id },
          {
            clientid: null,
            $or: [
              {
                type: { $in: ['close signal', 'open signal'] },
                segmentid: { $in: activeServiceIds }
              },
              { type: { $nin: ['close signal', 'open signal'] } }
            ]
          },
          {
            clienttype: {
              $in: ['active', 'expired', 'no subscribe', 'all']
            },
            $or: [
              { clienttype: 'active', segmentid: { $in: activeServiceIds } },
              {
                clienttype: 'expired',
                segmentid: {
                  $in: await Planmanage.find({
                    clientid: id,
                    enddate: { $lt: today }
                  }).distinct('serviceid')
                }
              },
              {
                clienttype: 'nonsubscribe',
                segmentid: {
                  $nin: await Planmanage.find({ clientid: id }).distinct('serviceid')
                }
              },
              { clienttype: 'all' }
            ]
          }
        ]
      });

      return res.json({
        status: true,
        message: "get",
        data: result,
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



  async Bank(req, res) {
    try {

      const banks = await Bank_Modal.find({ del: false, status: true, type: 1 });

      const protocol = req.protocol; // 'http' or 'https'
      const baseUrl = `${protocol}://${req.headers.host}`; // Construct base URL dynamically
      console.log(baseUrl);
      const bankWithImageUrls = banks.map(bank => {
        return {
          ...bank._doc, // Spread the original document
          image: bank.image ? `${baseUrl}/uploads/bank/${bank.image}` : null, // Append full image URL
        };
      });


      return res.status(200).json({
        status: true,
        message: "Bank retrieved successfully",
        data: bankWithImageUrls
      });
    } catch (error) {
      console.log("Error retrieving Bank:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message
      });
    }
  }


  async Qrcode(req, res) {
    try {

      const banks = await Bank_Modal.find({ del: false, status: true, type: 2 });

      const protocol = req.protocol; // 'http' or 'https'
      const baseUrl = `${protocol}://${req.headers.host}`; // Construct base URL dynamically

      const bankWithImageUrls = banks.map(bank => {
        return {
          ...bank._doc, // Spread the original document
          image: bank.image ? `${baseUrl}/uploads/bank/${bank.image}` : null, // Append full image URL
        };
      });


      return res.status(200).json({
        status: true,
        message: "Qrcode retrieved successfully",
        data: bankWithImageUrls
      });
    } catch (error) {
      console.log("Error retrieving Bank:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message
      });
    }
  }

  async placeOrder(req, res) {
    try {
      const { basket_id, clientid, brokerid, investmentamount, type } = req.body;
  
      const basket = await Basket_Modal.findById(basket_id);
      if (!basket) {
        return res.status(400).json({
          status: false,
          message: "Basket not found.",
        });
      }
  

                  
            if (investmentamount < basket.mininvamount) {
              return res.status(400).json({
                status: false,
                message: `Investment amount must be at least ${basket.mininvamount}.`,
              });
            }

            const client = await Clients_Modal.findById(clientid);
            if (!client) {
                return res.status(404).json({
                    status: false,
                    message: "Client not found"
                });
            }
            const config = {
              method: 'get', // HTTP method
              url: `https://ant.aliceblueonline.com/rest/AliceBlueAPIService/api/limits/getRmsLimits`, // Construct the full URL
              headers: {
                'Authorization': 'Bearer ' + userId + ' ' + authToken,
              }
            };
            
            axios(config)
              .then(response => {
                console.log(response.data); // Handle the response
              })
              .catch(error => {
                console.error('Error:', error); // Handle the error
              });
            


      // Get stocks for the basket
      const existingStocks = await Basketstock_Modal.find({ basket_id }).sort({ version: -1 });

      const version = existingStocks.length > 0 ? existingStocks[0].version : 1; 

if(version==1)  {
      if (investmentamount < basket.mininvamount) {
        return res.status(400).json({
          status: false,
          message: `Investment amount must be at least ${basket.mininvamount}.`,
        });
      }
    }
      
      if (!existingStocks || existingStocks.length === 0) {
        return res.status(400).json({
          status: false,
          message: "No stocks found in the basket.",
        });
      }
  
      // Total investment amount
      const totalAmount = investmentamount;
  
      // Initialize an array to store the calculated stock orders
      const stockOrders = [];
  
      // Iterate over each stock to calculate allocated amount and quantity
      for (const stock of existingStocks) {
        const { tradesymbol, weightage,name } = stock;
  
        try {
          // Fetch stock data from Stock_Modal
          const stockData = await Stock_Modal.findOne({ tradesymbol });
          if (!stockData) {
            console.log(`Stock data not found for trade symbol: ${tradesymbol}`);
            continue; // Skip this stock if no data found
          }
  
          const instrumentToken = stockData.instrument_token;
  
          // Fetch live price from Liveprice_Modal
          const livePrice = await Liveprice_Modal.findOne({ token: instrumentToken });
          if (!livePrice) {
            console.log(`Live price not found for instrument token: ${instrumentToken}`);
            continue; // Skip this stock if live price is unavailable
          }
  
          const lpPrice = livePrice.lp;
  
          // Calculate allocated amount and quantity
          const allocatedAmount = (weightage / 100) * totalAmount;
          const quantity = Math.floor(allocatedAmount / lpPrice); // Use Math.floor to avoid fractional shares
  
          // Store the order details for the stock
          const stockOrder = {
            symbol:name,
            tradesymbol,
            quantity,
            lpPrice,
            clientid,
            basket_id,
            version,
            instrumentToken
          };
          // Add the stock order to the stockOrders array
          stockOrders.push(stockOrder);

 if(type==1) {


       if(brokerid==2) {
          await orderplace({
            id: clientid,
            basket_id:basket_id,
            quantity,
            price: lpPrice,
            tradesymbol: tradesymbol,
            instrumentToken: instrumentToken,
            version: stock.version,
            brokerid: brokerid,
            calltype: "BUY", // Increment version for the new stock order
          });
        }
        else if(brokerid==1) {
          await angleorderplace({
            id: clientid,
            basket_id:basket_id,
            quantity,
            price: lpPrice,
            tradesymbol: tradesymbol,
            instrumentToken: instrumentToken,
            version: stock.version,
            brokerid: brokerid,
            calltype: "BUY", // Increment version for the new stock order
          });
        
        }
        else if(brokerid==3) {
          await kotakneoorderplace({
            id: clientid,
            basket_id:basket_id,
            quantity,
            price: lpPrice,
            tradesymbol: tradesymbol,
            instrumentToken: instrumentToken,
            version: stock.version,
            brokerid: brokerid,
            calltype: "B", // Increment version for the new stock order
          });
        
        }
        else if(brokerid==4) {
          await markethuborderplace({
            id: clientid,
            basket_id:basket_id,
            quantity,
            price: lpPrice,
            tradesymbol: tradesymbol,
            instrumentToken: instrumentToken,
            version: stock.version,
            brokerid: brokerid,
            calltype: "BUY", // Increment version for the new stock order
          });
        
        }

      }

        } catch (innerError) {
          console.error(`Error processing stock ${tradesymbol}:`, innerError);
          continue; // Skip this stock in case of an error
        }
      }
  
      
      res.status(200).json({
        status: true,
        message: type == 1 ? "Order Placed Successfully." : "Order Confirm Successfully.",
        data: stockOrders,
      });
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({
        status: false,
        message: "An error occurred while placing the order.",
      });
    }
  }
  
  


  async exitPlaceOrder(req, res) {
    try {
      const { basket_id, clientid, brokerid, version } = req.body;
  
      const basket = await Basket_Modal.findById(basket_id);
      if (!basket) {
        return res.status(400).json({
          status: false,
          message: "Basket not found.",
        });
      }
  
      // Get stocks for the basket
      const existingStocks = await Basketstock_Modal.find({ basket_id:basket_id,version:version });      
      if (!existingStocks || existingStocks.length === 0) {
        return res.status(400).json({
          status: false,
          message: "No stocks found in the basket.",
        });
      }
  
      // Total investment amount
  
      // Initialize an array to store the calculated stock orders
      const stockOrders = [];
  
      // Iterate over each stock to calculate allocated amount and quantity
      for (const stock of existingStocks) {
        const { tradesymbol, quantity } = stock;
  
        try {
          // Fetch stock data from Stock_Modal
          const stockData = await Stock_Modal.findOne({ tradesymbol });
          if (!stockData) {
            console.log(`Stock data not found for trade symbol: ${tradesymbol}`);
            continue; // Skip this stock if no data found
          }
  
          const instrumentToken = stockData.instrument_token;
  
          // Fetch live price from Liveprice_Modal
          const livePrice = await Liveprice_Modal.findOne({ token: instrumentToken });
          if (!livePrice) {
            console.log(`Live price not found for instrument token: ${instrumentToken}`);
            continue; // Skip this stock if live price is unavailable
          }
  
          const lpPrice = livePrice.lp;
  
        
          const stockOrder = {
            tradesymbol,
            quantity,
            lpPrice,
            clientid,
            basket_id,
            version,
            instrumentToken
          };
          // Add the stock order to the stockOrders array
          stockOrders.push(stockOrder);


          if(brokerid==2) {
          await orderplace({
            id: clientid,
            basket_id:basket_id,
            quantity,
            price: lpPrice,
            tradesymbol: tradesymbol,
            instrumentToken: instrumentToken,
            version: version,
            brokerid: brokerid,
            calltype: "SELL", 
          });
        }
          else if(basket_id==1) {
            await angleorderplace({
              id: clientid,
              basket_id:basket_id,
              quantity,
              price: lpPrice,
              tradesymbol: tradesymbol,
              instrumentToken: instrumentToken,
              version: version,
              brokerid: brokerid,
              calltype: "SELL",  
            });
          
          }
          else if(brokerid==3) {

            await kotakneoorderplace({
              id: clientid,
              basket_id:basket_id,
              quantity,
              price: lpPrice,
              tradesymbol: tradesymbol,
              instrumentToken: instrumentToken,
              version: version,
              brokerid: brokerid,
              calltype: "S", // Increment version for the new stock order
            });
          
          }
          else if(brokerid==4) {
            await markethuborderplace({
              id: clientid,
              basket_id:basket_id,
              quantity,
              price: lpPrice,
              tradesymbol: tradesymbol,
              instrumentToken: instrumentToken,
              version: version,
              brokerid: brokerid,
              calltype: "SELL",  
            });
          
          }
        } catch (innerError) {
          console.error(`Error processing stock ${tradesymbol}:`, innerError);
          continue; // Skip this stock in case of an error
        }
      }
  
      // Respond with success and order details
      res.status(200).json({
        status: true,
        message: "Order placed successfully.",
        data: stockOrders,
      });
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({
        status: false,
        message: "An error occurred while placing the order.",
      });
    }
  }
  


  async Refer(req, res) {
    return res.status(200).json({
      status: true,
    });
  }


}
module.exports = new List();