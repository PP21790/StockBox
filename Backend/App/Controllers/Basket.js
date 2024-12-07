const db = require("../Models");
const mongoose = require('mongoose'); 
const csv = require('csv-parser');
const path = require('path');
const { Readable } = require('stream');  
const Basket_Modal = db.Basket;
const Basketstock_Modal = db.Basketstock;
const Stock_Modal = db.Stock;
const Liveprice_Modal = db.Liveprice;

class Basket {

  
    async AddBasket(req, res) {
      try {
          const { title, description, full_price, basket_price, mininvamount, themename, accuracy, portfolioweightage, cagr, frequency, validity, next_rebalance_date , type, add_by } = req.body;
  
        
          const result = new Basket_Modal({
                        title,
                        description,
                        basket_price,
                        mininvamount,
                        themename,
                        accuracy,
                        portfolioweightage,
                        add_by,
                        cagr,
                        frequency,
                        validity,
                        next_rebalance_date,
                        full_price,
                        type

          });
  

          await result.save();
  
          return res.json({
              status: true,
              message: "Basket added successfully",
              data: result,
          });
      } catch (error) {
          console.log("Error adding Basket:", error);
  
          return res.status(500).json({
              status: false,
              message: "Server error",
              error: error.message,
          });
      }
  }
  
  async AddStockInBasket(req, res) {
    try {
      const file = req.file;
  
      if (!file) {
        return res.status(400).json({
          status: false,
          message: "File is required",
        });
      }
  
      const ext = path.extname(file.originalname);
      let stocks = [];
  
      if (ext === '.csv') {
        stocks = await new Promise((resolve, reject) => {
          const stocks = [];
          Readable.from(file.buffer)
            .pipe(csv())
            .on('data', (row) => {
              stocks.push(row);
            })
            .on('end', () => {
              resolve(stocks);
            })
            .on('error', reject);
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Unsupported file format. Only CSV files are allowed.",
        });
      }
  
      const { basket_id } = req.body; // Get basket_id from the request body
  
      // Validate basket existence
      const basket = await Basket_Modal.findById(basket_id);
      if (!basket) {
        return res.status(400).json({
          status: false,
          message: "Basket not found.",
        });
      }
  

      const existingStocks = await Basketstock_Modal.find({ basket_id }).sort({ version: -1 });

      let totalAmount = 0;
      
      if (existingStocks && existingStocks.length > 0) {
        let totalSum = 0;
      
        for (const stock of existingStocks) {
          const tradeSymbol = stock.tradesymbol;
          const quantity = stock.quantity;
      
          // Fetch the instrument token from the Stocks table
          const stockData = await Stock_Modal.findOne({ tradesymbol: tradeSymbol });
      
          if (stockData) {
            const instrumentToken = stockData.instrument_token;
      
            // Fetch the live price using the instrument token from StockLivePrices
            const livePrice = await Liveprice_Modal.findOne({ token: instrumentToken });
      
            if (livePrice) {
              const lpPrice = livePrice.lp;
      
              // Multiply lp_price by quantity and add to the total sum
              totalSum += lpPrice * quantity;
            } else {
              console.log(`Live price not found for instrument token: ${instrumentToken}`);
            }
          } else {
            console.log(`Stock data not found for trade symbol: ${tradeSymbol}`);
          }
        }
      
        totalAmount = totalSum;
      } else {
        // Set the total amount to the basket's minimum investment amount if no stocks exist
        totalAmount = basket.mininvamount;
      }
 


      // const marketPrices = {
      //   'AAPL': 150,
      //   'GOOGL': 2800,
      //   'MSFT': 300,
      //   'TSLA': 700,
      // };
  
      let remainingAmount = totalAmount; // Keep track of remaining amount
      const bulkOps = [];
  
      for (const stock of stocks) {
        const { name, tradesymbol, percentage, price, comment, type } = stock;
  
        const currentPrice = price;
        if (!currentPrice) {
          return res.status(400).json({
            status: false,
            message: `No market price found for ${tradesymbol}`,
          });
        }
  
        // Calculate allocation
        const allocatedAmount = (percentage / 100) * totalAmount;
        if (allocatedAmount > remainingAmount) {
          return res.status(400).json({
            status: false,
            message: `Insufficient funds to allocate ${allocatedAmount} for ${tradesymbol}`,
          });
        }
  
        // Calculate quantity and total value
        const quantity = Math.floor(allocatedAmount / currentPrice);
        const total_value = quantity * currentPrice;
  
        // Deduct from remaining amount
        remainingAmount -= total_value;
  
        // Find the latest version of the stock in the basket
        const version = existingStocks.length > 0 ? existingStocks[0].version + 1 : 1;
  
        // Prepare data for bulk insertion
        bulkOps.push({
          insertOne: {
            document: {
              basket_id,
              name,
              tradesymbol,
              price: currentPrice,
              total_value,
              quantity,
              type,
              comment: comment || '',
              version,
              weightage:percentage,
            },
          },
        });
      }
  
      // Execute the bulk insert
      const result = await Basketstock_Modal.bulkWrite(bulkOps);
  
      return res.json({
        status: true,
        message: "Stocks added successfully.",
        data: result,
      });
    } catch (error) {
      console.error("Error adding stocks:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
  
  async AddStockInBasketForm(req, res) {
    try {
      const { basket_id, stocks } = req.body; // Get basket_id and stocks from the request body
  
      // Validate basket existence
      const basket = await Basket_Modal.findById(basket_id);
      if (!basket) {
        return res.status(400).json({
          status: false,
          message: "Basket not found.",
        });
      }
      const existingStocks = await Basketstock_Modal.find({ basket_id }).sort({ version: -1 });

      let totalAmount = 0;
      
      if (existingStocks && existingStocks.length > 0) {
        let totalSum = 0;
      
        for (const stock of existingStocks) {
          const tradeSymbol = stock.tradesymbol;
          const quantity = stock.quantity;
      
          // Fetch the instrument token from the Stocks table
          const stockData = await Stock_Modal.findOne({ tradesymbol: tradeSymbol });
      
          if (stockData) {
            const instrumentToken = stockData.instrument_token;
      
            // Fetch the live price using the instrument token from StockLivePrices
            const livePrice = await Liveprice_Modal.findOne({ token: instrumentToken });
      
            if (livePrice) {
              const lpPrice = livePrice.lp;
      
              // Multiply lp_price by quantity and add to the total sum
              totalSum += lpPrice * quantity;
            } else {
              console.log(`Live price not found for instrument token: ${instrumentToken}`);
            }
          } else {
            console.log(`Stock data not found for trade symbol: ${tradeSymbol}`);
          }
        }
      
        totalAmount = totalSum;
      } else {
        // Set the total amount to the basket's minimum investment amount if no stocks exist
        totalAmount = basket.mininvamount;
      }
 

      let remainingAmount = totalAmount; // Keep track of remaining amount
  
      if (!Array.isArray(stocks) || stocks.length === 0) {
        return res.status(400).json({
          status: false,
          message: "Stocks data is required and should be an array.",
        });
      }
  
      const bulkOps = [];
  
      for (const stock of stocks) {
        const { name, tradesymbol, percentage, price, comment, type } = stock;
  
        const currentPrice = price;
        if (!currentPrice) {
          return res.status(400).json({
            status: false,
            message: `No market price found for ${tradesymbol}`,
          });
        }
  
        // Calculate allocation
        const allocatedAmount = (percentage / 100) * totalAmount;
        if (allocatedAmount > remainingAmount) {
          return res.status(400).json({
            status: false,
            message: `Insufficient funds to allocate ${allocatedAmount} for ${tradesymbol}`,
          });
        }
  
        // Calculate quantity and total value
        const quantity = Math.floor(allocatedAmount / currentPrice);
        const total_value = quantity * currentPrice;
  
        // Deduct from remaining amount
        remainingAmount -= total_value;
  
        // Find the latest version of the stock in the basket
      
        const version = existingStocks.length > 0 ? existingStocks[0].version + 1 : 1;


        bulkOps.push({
          insertOne: {
            document: {
              basket_id,
              name,
              tradesymbol,
              price: currentPrice,
              total_value,
              quantity,
              type,
              comment: comment || '',
              version,
              weightage: percentage,
            },
          },
        });
      }
  
      // Execute the bulk insert
      const result = await Basketstock_Modal.bulkWrite(bulkOps);
  
      return res.json({
        status: true,
        message: "Stocks added successfully.",
        data: result,
      });
    } catch (error) {
      console.error("Error adding stocks:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }


  async UpdateStockInBasketForm(req, res) {
    try {
      const { basket_id, stocks } = req.body; // Get basket_id and stocks from the request body
  
      // Validate basket existence
      const basket = await Basket_Modal.findById(basket_id);
      if (!basket) {
        return res.status(400).json({
          status: false,
          message: "Basket not found.",
        });
      }
  
      const totalAmount = basket.mininvamount; // Total amount to invest
      let remainingAmount = totalAmount; // Keep track of remaining amount
  
      if (!Array.isArray(stocks) || stocks.length === 0) {
        return res.status(400).json({
          status: false,
          message: "Stocks data is required and should be an array.",
        });
      }
  
      const bulkOps = [];
  
      for (const stock of stocks) {
        const { name, tradesymbol, percentage, price, comment, type } = stock;
  
        const currentPrice = price;
        if (!currentPrice) {
          return res.status(400).json({
            status: false,
            message: `No market price found for ${tradesymbol}`,
          });
        }
  
        const allocatedAmount = (percentage / 100) * totalAmount;
        if (allocatedAmount > remainingAmount) {
          return res.status(400).json({
            status: false,
            message: `Insufficient funds to allocate ${allocatedAmount} for ${tradesymbol}`,
          });
        }
  
        // Calculate quantity and total value
        const quantity = Math.floor(allocatedAmount / currentPrice);
        const total_value = quantity * currentPrice;
  
        // Deduct from remaining amount
        remainingAmount -= total_value;
  
        // Find the latest version of the stock in the basket
        const existingStock = await Basketstock_Modal.findOne({
          basket_id,
          tradesymbol,
        }).sort({ version: -1 });
  
  
        bulkOps.push({
          updateOne: {
            filter: { basket_id, tradesymbol },
            update: {
              $set: {
                name,
                price: currentPrice,
                total_value,
                quantity,
                type,
                comment: comment || '',
                weightage: percentage,
              },
            },
            upsert: true, // If stock does not exist, create a new one
          },
        });
      }
  
      // Execute the bulk upsert
      const result = await Basketstock_Modal.bulkWrite(bulkOps);
  
      return res.json({
        status: true,
        message: "Stocks updated successfully.",
        data: result,
      });
    } catch (error) {
      console.error("Error updating stocks:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
  


  
  async getBasket(req, res) {
    try {

        const baskets = await Basket_Modal.find({ del: false });

        return res.json({
            status: true,
            message: "Baskets fetched successfully",
            data: baskets
        });

    } catch (error) {
        console.log("An error occurred:", error);
        return res.json({ 
            status: false, 
            message: "Server error", 
            data: [] 
        });
    }
}


    async activeBasket(req, res) {
      try {

          const baskets = await Basket_Modal.find({ del: false,status:true });

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
 
   
  async detailBasket(req, res) {
    try {
        // Extract ID from request parameters
        const { id } = req.params;

        // Check if ID is provided
        if (!id) {
            return res.status(400).json({
                status: false,
                message: "Basket ID is required"
            });
        }

        // Find the basket by ID
        const basket = await Basket_Modal.findById(id);

        // Check if the basket is found
        if (!basket) {
            return res.status(404).json({
                status: false,
                message: "Basket not found"
            });
        }

        // Split the data by '##'
    
        // Return the basket details along with grouped data
        return res.json({
            status: true,
            message: "Basket details fetched successfully",
            data:basket
        });

    } catch (error) {
        console.log("Error fetching Basket details:", error);
        return res.status(500).json({
            status: false,
            message: "Server error",
            data: []
        });
    }
}


  async updateBasket(req, res) {
    try {
      const { id, title, description, full_price, basket_price, mininvamount, themename, accuracy, portfolioweightage, cagr, frequency, validity, next_rebalance_date, type  } = req.body;
  
      if (!id) {
        return res.status(400).json({
          status: false,
          message: "Basket ID is required",
        });
      }
  
      const updatedBasket = await Basket_Modal.findByIdAndUpdate(
        id,
        {
          title,
          description,
          basket_price,
          mininvamount,
          themename,
          accuracy,
          portfolioweightage,
          cagr,
          frequency,
          validity,
          next_rebalance_date,
          full_price,
          type
        },
        { Basket: true, runValidators: true } // Options: return the updated document and run validators
      );
  
      if (!updatedBasket) {
        return res.status(404).json({
          status: false,
          message: "Basket not found",
        });
      }
  
      console.log("Updated Basket:", updatedBasket);
      return res.json({
        status: true,
        message: "Basket updated successfully",
        data: updatedBasket,
      });
  
    } catch (error) {
      console.log("Error updating Basket:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
  
  
  async deleteBasket(req, res) {
    try {
      const { id } = req.params; // Extract ID from URL params

      if (!id) {
        return res.status(400).json({
          status: false,
          message: "Basket ID is required",
        });
      }

      //const deletedBasket = await Basket_Modal.findByIdAndDelete(id);
      const deletedBasket = await Basket_Modal.findByIdAndUpdate(
        id, 
        { del: true }, // Set del to true
        { Basket: true }  // Return the updated document
      );

      if (!deletedBasket) {
        return res.status(404).json({
          status: false,
          message: "Basket not found",
        });
      }

      console.log("Deleted Basket:", deletedBasket);
      return res.json({
        status: true,
        message: "Basket deleted successfully",
        data: deletedBasket,
      });
    } catch (error) {
      console.log("Error deleting Basket:", error);
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
      const validStatuses = [true, false];
      if (!validStatuses.includes(status)) {
          return res.status(400).json({
              status: false,
              message: "Invalid status value"
          });
      }

      // Find and update the Basket
      const result = await Basket_Modal.findByIdAndUpdate(
          id,
          { status: status },
          { new: true } // Return the updated document
      );

      if (!result) {
          return res.status(404).json({
              status: false,
              message: "Basket not found"
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
module.exports = new Basket();