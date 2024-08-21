const db = require("../Models");
const upload = require('../Utils/multerHelper'); 
const Blogs_Modal = db.Blogs;
class BlogController {
    // Create a new blog post
    async AddBlogs(req, res) {
        try {
            // Handle the image upload
            await new Promise((resolve, reject) => {
                upload('blogs').fields([{ name: 'image', maxCount: 1 }])(req, res, (err) => {
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
            const result = new Blogs_Modal({
                title: title,
                description: description,
                image: image,
            });
            
            // Save the result to the database
            await result.save();
    
            console.log("result", result);
            return res.json({
                status: true,
                message: "Blogs added successfully",
            });
    
        } catch (error) {
            console.error("Server error:", error);
            return res.status(500).json({ status: false, message: "Server error", data: [] });
        }
    }

    // Get all blog posts
    async getBlogs(req, res) {
        try {
            const blogs = await Blogs_Modal.find({ del: false });

            return res.status(200).json({
                status: true,
                message: "Blogs retrieved successfully",
                data: blogs
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

    // Get a single blog post by ID
    async detailBlogs(req, res) {
        try {
            const { id } = req.params;

            const blog = await Blogs_Modal.findById(id);

            if (!blog) {
                return res.status(404).json({
                    status: false,
                    message: "Blog not found"
                });
            }

            return res.status(200).json({
                status: true,
                message: "Blog retrieved successfully",
                data: blog
            });
        } catch (error) {
            console.error("Error retrieving blog:", error);
            return res.status(500).json({
                status: false,
                message: "Server error",
                error: error.message
            });
        }
    }


    async updateBlogs(req, res) {
        try {
            const { id, title, description } = req.body;
          
            if (!id) {
                return res.status(400).json({
                    status: false,
                    message: "Blogs ID is required",
                });
            }
    
            // Handle the image upload
            await new Promise((resolve, reject) => {
                upload('blogs').fields([{ name: 'image', maxCount: 1 }])(req, res, (err) => {
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
            const updatedBlogs = await Blogs_Modal.findByIdAndUpdate(
                id,
                updateFields,
                { new: true, runValidators: true } // Options: return the updated document and run validators
            );
    
            // If the news item is not found
            if (!updatedBlogs) {
                return res.status(404).json({
                    status: false,
                    message: "Blog not found",
                });
            }
    
            console.log("Updated Blog:", updatedBlogs);
            return res.json({
                status: true,
                message: "Blog updated successfully",
                data: updatedBlogs,
            });
    
        } catch (error) {
            console.error("Error updating Blog:", error);
            return res.status(500).json({
                status: false,
                message: "Server error",
                error: error.message,
            });
        }
    }
    
   
  
    // Delete a blog post by ID
    async deleteBlogs(req, res) {
        try {
            const { id } = req.params;

            // const deletedBlog = await Blogs_Modal.findByIdAndDelete(id);
            const deletedBlog = await Blogs_Modal.findByIdAndUpdate(
                id, 
                { del: true }, // Set del to true
                { new: true }  // Return the updated document
              );

            if (!deletedBlog) {
                return res.status(404).json({
                    status: false,
                    message: "Blog not found"
                });
            }

            return res.status(200).json({
                status: true,
                message: "Blog deleted successfully"
            });
        } catch (error) {
            console.error("Error deleting blog:", error);
            return res.status(500).json({
                status: false,
                message: "Server error",
                error: error.message
            });
        }
    }
}

module.exports = new BlogController();
