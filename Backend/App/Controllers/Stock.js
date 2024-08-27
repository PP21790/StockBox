const db = require("../Models");
const multer = require('multer');
const xlsx = require('xlsx');
const csv = require('csv-parser');
const path = require('path');
const Stock_Modal = db.Stock;


class Stock {


 

    async AddStock(req, res) {
        try {
            const { title,add_by,symbol } = req.body;
    
           // console.log("Request Body:", req.body);
    
            const result = new Stock_Modal({
                title,
                symbol,
                add_by,
            });
    
            await result.save();
    
            //console.log("Stock successfully added:", result);
            return res.json({
                status: true,
                message: "Stock added successfully",
                data: result,
            });
    
        } catch (error) {
            // Enhanced error logging
            console.error("Error adding Stock:", error);
    
            return res.status(500).json({
                status: false,
                message: "Server error",
                error: error.message,
            });
        }
    }
    

  async getStock(req, res) {
    try {

     
     
      const { } = req.body;

      const result = await Stock_Modal.find({ del: false });


      return res.json({
        status: true,
        message: "get",
        data:result
      });

    } catch (error) {
      return res.json({ status: false, message: "Server error", data: [] });
    }
  }

  async activeStock(req, res) {
    try {

     
     
      const { } = req.body;

      const result = await Stock_Modal.find({ del: false,status: true });


      return res.json({
        status: true,
        message: "get",
        data:result
      });

    } catch (error) {
      return res.json({ status: false, message: "Server error", data: [] });
    }
  }

  async detailStock(req, res) {
    try {
        // Extract ID from request parameters
        const { id } = req.params;

        // Check if ID is provided
        if (!id) {
            return res.status(400).json({
                status: false,
                message: "Stock ID is required"
            });
        }

        const Stock = await Stock_Modal.findById(id);

        if (!Stock) {
            return res.status(404).json({
                status: false,
                message: "Stock not found"
            });
        }

        return res.json({
            status: true,
            message: "Stock details fetched successfully",
            data: Stock
        });

    } catch (error) {
        console.error("Error fetching Stock details:", error);
        return res.status(500).json({
            status: false,
            message: "Server error",
            data: []
        });
    }
}


  async updateStock(req, res) {
    try {
      const { id, title, symbol } = req.body;
  
      if (!id) {
        return res.status(400).json({
          status: false,
          message: "Stock ID is required",
        });
      }
  
      const updatedStock = await Stock_Modal.findByIdAndUpdate(
        id,
        {
          title,
          symbol,
        },
        { stock: true, runValidators: true } // Options: return the updated document and run validators
      );
  
      if (!updatedStock) {
        return res.status(404).json({
          status: false,
          message: "Stock not found",
        });
      }
  
      console.log("Updated Stock:", updatedStock);
      return res.json({
        status: true,
        message: "Stock updated successfully",
        data: updatedStock,
      });
  
    } catch (error) {
      console.error("Error updating Stock:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
  
  
  async deleteStock(req, res) {
    try {
      const { id } = req.params; // Extract ID from URL params

      if (!id) {
        return res.status(400).json({
          status: false,
          message: "Stock ID is required",
        });
      }


      const deletedStock = await Stock_Modal.findByIdAndUpdate(
        id, 
        { del: true }, // Set del to true
        { new: true }  // Return the updated document
      );


      if (!deletedStock) {
        return res.status(404).json({
          status: false,
          message: "Stock not found",
        });
      }

      console.log("Deleted Stock:", deletedStock);
      return res.json({
        status: true,
        message: "Stock deleted successfully",
        data: deletedStock,
      });
    } catch (error) {
      console.error("Error deleting Stock:", error);
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
        const result = await Stock_Modal.findByIdAndUpdate(
            id,
            { status: status },
            { new: true } // Return the updated document
        );
  
        if (!result) {
            return res.status(404).json({
                status: false,
                message: "Stock not found"
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
  async AddBulkStock(req, res) {
    try {
        const { add_by } = req.body;
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
            // Handle CSV file
        
            stocks = await new Promise((resolve, reject) => {
              const stocks = [];
              require('stream').Readable.from(file.buffer)
                  .pipe(require('csv-parser')())
                  .on('data', (row) => {
                      stocks.push(row);
                  })
                  .on('end', () => {
                      resolve(stocks);
                  })
                  .on('error', reject);
          });

        
        }else {
            return res.status(400).json({
                status: false,
                message: "Unsupported file format. Only CSV  files are allowed.",
            });
        }

        const results = [];
        for (let stock of stocks) {
            const { symbol, title } = stock;

            // Check if the stock symbol already exists
            const existingStock = await Stock_Modal.findOne({ symbol });

            if (existingStock) {
                // Update the existing stock
                existingStock.title = title;
                existingStock.add_by = add_by;
                await existingStock.save();
                results.push({ symbol, title, action: 'updated' });
            } else {
                // Add new stock
                const newStock = new Stock_Modal({ symbol, title, add_by });
                await newStock.save();
                results.push({ symbol, title, action: 'added' });
            }
        }

        return res.json({
            status: true,
            message: "Stocks processed successfully",
            data: results,
        });

    } catch (error) {
        console.error("Error processing stocks:", error);
        return res.status(500).json({
            status: false,
            message: "Server error",
            error: error.message,
        });
    }
}

// Helper function to process CSV from buffer
async processCSV(buffer) {
    return new Promise((resolve, reject) => {
        const stocks = [];
        require('stream').Readable.from(buffer)
            .pipe(csv())
            .on('data', (row) => {
                stocks.push(row);
            })
            .on('end', () => {
                resolve(stocks);
            })
            .on('error', reject);
    });
}

// Helper function to process Excel from buffer

}



module.exports = new Stock();