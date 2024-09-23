const db = require("../Models");
const mongoose = require('mongoose'); // Import mongoose
const Basket_Modal = db.Basket;


class Basket {

  
    async AddBasket(req, res) {
      try {
          const {
              title, description, price, add_by, accuracy, mininvamount, portfolioweightage, themename, returnpercentage,holdingperiod,potentialleft, Stock
          } = req.body;
  
          // Concatenate each stock field into a delimited string
          const stocks = Stock.map(stock => stock.stocks).join('##');
          const pricerange = Stock.map(stock => stock.pricerange).join('##');
          const stockweightage = Stock.map(stock => stock.stockweightage).join('##');
          const entryprice = Stock.map(stock => stock.entryprice).join('##');
          const entrydate = Stock.map(stock => stock.entrydate).join('##');
          const exitprice = Stock.map(stock => stock.exitprice).join('##');
          const exitdate = Stock.map(stock => stock.exitdate).join('##');
          const comment = Stock.map(stock => stock.comment).join('##');
  
          // Create a new basket document
          const result = new Basket_Modal({
                        title,
                        description,
                        price,
                        add_by,
                        accuracy,
                        mininvamount,
                        portfolioweightage,
                        stocks,
                        pricerange,
                        stockweightage,
                        entryprice,
                        entrydate,
                        exitprice,
                        exitdate,
                        comment,
                        returnpercentage,
                        holdingperiod,
                        potentialleft,
                        themename,
          });
  
          // Save the basket to the database
          await result.save();
  
          return res.json({
              status: true,
              message: "Basket added successfully",
              data: result,
          });
      } catch (error) {
          console.error("Error adding Basket:", error);
  
          return res.status(500).json({
              status: false,
              message: "Server error",
              error: error.message,
          });
      }
  }
  
  




  async getBasket(req, res) {
    try {

      console.log(`${removeResult.modifiedCount} documents updated with field removal`);


        // Fetch active baskets
        const baskets = await Basket_Modal.find({ del: false });

        return res.json({
            status: true,
            message: "Baskets fetched successfully",
            data: baskets
        });

    } catch (error) {
        console.error("An error occurred:", error);
        return res.json({ 
            status: false, 
            message: "Server error", 
            data: [] 
        });
    }
}


    async activeBasket(req, res) {
      try {

         
          const baskets = await Basket_Modal.find({ del: false,status:"active" });
  
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
    

            const basket = await Basket_Modal.findById(id);
            
          
            // Check if Basket is found
            if (basket.length === 0) {
                return res.status(404).json({
                    status: false,
                    message: "Basket not found"
                });
            }
    
            return res.json({
                status: true,
                message: "Basket details fetched successfully",
                data: basket // Since we're matching by ID, the result will be an array with a single document
            });
    
        } catch (error) {
            console.error("Error fetching Basket details:", error);
            return res.status(500).json({
                status: false,
                message: "Server error",
                data: []
            });
        }
    }

  async updateBasket(req, res) {
    try {
      const {
       id, title, description, price, add_by, accuracy, mininvamount, portfolioweightage, themename, returnpercentage,holdingperiod,potentialleft, Stock
    } = req.body;

    // Concatenate each stock field into a delimited string
    const stocks = Stock.map(stock => stock.stocks).join('##');
    const pricerange = Stock.map(stock => stock.pricerange).join('##');
    const stockweightage = Stock.map(stock => stock.stockweightage).join('##');
    const entryprice = Stock.map(stock => stock.entryprice).join('##');
    const entrydate = Stock.map(stock => stock.entrydate).join('##');
    const exitprice = Stock.map(stock => stock.exitprice).join('##');
    const exitdate = Stock.map(stock => stock.exitdate).join('##');
    const comment = Stock.map(stock => stock.comment).join('##');

       // const { id, title, description, price, validity,accuracy } = req.body;
  
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
          price,
          accuracy,
          mininvamount,
          portfolioweightage,
          stocks,
          pricerange,
          stockweightage,
          entryprice,
          entrydate,
          exitprice,
          exitdate,
          comment,
          returnpercentage,
          holdingperiod,
          potentialleft,
          themename,
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
      console.error("Error updating Basket:", error);
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
      console.error("Error deleting Basket:", error);
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
      console.error("Error updating status:", error);
      return res.status(500).json({
          status: false,
          message: "Server error",
          data: []
      });
  }
}




  
}
module.exports = new Basket();