const db = require("../Models");
const upload = require('../Utils/multerHelper'); 
const News_Modal = db.News;
class NewsController {
    // Create a new blog post
    async AddNews(req, res) {
        try {
            // Handle the image upload
            await new Promise((resolve, reject) => {
                upload('news').fields([{ name: 'image', maxCount: 1 }])(req, res, (err) => {
                    if (err) {
                        console.error('File upload error:', err);
                        return reject(err);
                    }
                    resolve();
                });
            });
    
            // After the upload is successful, proceed with the rest of the logic
            const { title, description } = req.body;
            const image = req.files['image'] ? req.files['image'][0].filename : null;
    
            // Create a new News record
            const result = new News_Modal({
                title: title,
                description: description,
                image: image,
            });
            
            // Save the result to the database
            await result.save();
    
            console.log("result", result);
            return res.json({
                status: true,
                message: "News added successfully",
            });
    
        } catch (error) {
            console.error("Server error:", error);
            return res.status(500).json({ status: false, message: "Server error", data: [] });
        }
    }
    
    // Get all blog posts
    async getNews(req, res) {
        try {
           // const news = await News_Modal.find();
            const news = await News_Modal.find({ del: false });

            return res.status(200).json({
                status: true,
                message: "News retrieved successfully",
                data: news
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

    // Get a single blog post by ID
    async detailNews(req, res) {
        try {
            const { id } = req.params;

            const news = await News_Modal.findById(id);

            if (!news) {
                return res.status(404).json({
                    status: false,
                    message: "News not found"
                });
            }

            return res.status(200).json({
                status: true,
                message: "News retrieved successfully",
                data: news
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

   
    async updateNews(req, res) {
        try {
            const { id, title, description } = req.body;
          
            if (!id) {
                return res.status(400).json({
                    status: false,
                    message: "News ID is required",
                });
            }
    
            // Handle the image upload
            await new Promise((resolve, reject) => {
                upload('news').fields([{ name: 'image', maxCount: 1 }])(req, res, (err) => {
                    if (err) {
                        console.error('File upload error:', err);
                        return reject(err);
                    }
                    resolve();
                });
            });
    
            // Get the updated image filename if a new image was uploaded
            const image = req.files && req.files['image'] ? req.files['image'][0].filename : null;
    
            // Prepare the update object
            const updateFields = {
                title,
                description,
            };
    
            if (image) {
                updateFields.image = image;
            }
    
            // Find the news by ID and update the fields
            const updatedNews = await News_Modal.findByIdAndUpdate(
                id,
                updateFields,
                { new: true, runValidators: true } // Options: return the updated document and run validators
            );
    
            // If the news item is not found
            if (!updatedNews) {
                return res.status(404).json({
                    status: false,
                    message: "News not found",
                });
            }
    
            console.log("Updated News:", updatedNews);
            return res.json({
                status: true,
                message: "News updated successfully",
                data: updatedNews,
            });
    
        } catch (error) {
            console.error("Error updating News:", error);
            return res.status(500).json({
                status: false,
                message: "Server error",
                error: error.message,
            });
        }
    }
    
  
    // Delete a blog post by ID
    async deleteNews(req, res) {
        try {
            const { id } = req.params;

          //  const deletedNews = await News_Modal.findByIdAndDelete(id);

          const deletedNews = await News_Modal.findByIdAndUpdate(
            id, 
            { del: true }, // Set del to true
            { new: true }  // Return the updated document
          );
    

            if (!deletedNews) {
                return res.status(404).json({
                    status: false,
                    message: "News not found"
                });
            }

            return res.status(200).json({
                status: true,
                message: "News deleted successfully"
            });
        } catch (error) {
            console.error("Error deleting news:", error);
            return res.status(500).json({
                status: false,
                message: "Server error",
                error: error.message
            });
        }
    }
}

module.exports = new NewsController();
