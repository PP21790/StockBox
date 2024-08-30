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

                    if (!req.files || !req.files['image']) {
                       
                        return res.status(400).json({ status: false, message: "No file uploaded." });
                      }


                    resolve();
                });
            });
    
            // After the upload is successful, proceed with the rest of the logic
            const { title, description,add_by } = req.body;

            if (!title) {
                return res.status(400).json({ status: false, message: "title is required" });
              }
              if (!description) {
                return res.status(400).json({ status: false, message: "description is required" });
              }
          
              if (!add_by) {
                return res.status(400).json({ status: false, message: "add_by is required" });
              }


            const image = req.files['image'] ? req.files['image'][0].filename : null;
    
            // Create a new News record
            const result = new Blogs_Modal({
                title: title,
                description: description,
                image: image,
                add_by:add_by,
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

    async activeBlogs(req, res) {
        try {

            const blogs = await Blogs_Modal.find({ del: false,status: true });

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


    async  updateBlogs(req, res) {
        try {
            // Log incoming data for debugging
         //   console.log('Request Body:', req.body);
    
            // Handle the image upload
            await new Promise((resolve, reject) => {
                upload('blogs').fields([{ name: 'image', maxCount: 1 }])(req, res, (err) => {
                    if (err) {
                        console.error('File upload error:', err);
                        return reject(err);
                    }

                    if (!req.files || !req.files['image']) {
                       
                        return res.status(400).json({ status: false, message: "No file uploaded." });
                      }
                    resolve();
                });
            });
    
            // Extracting fields from the request body
            const { id, title, description } = req.body;
    
            // Validating required fields
            if (!id) {
                return res.status(400).json({
                    status: false,
                    message: "Blog ID is required",
                });
            }
            if (!title) {
                return res.status(400).json({ status: false, message: "Title is required" });
            }
            if (!description) {
                return res.status(400).json({ status: false, message: "Description is required" });
            }
    
            // Get the uploaded image file name if present
            const image = req.files && req.files['image'] ? req.files['image'][0].filename : null;
    
            // Prepare the update object with the fields to update
            const updateFields = { title, description };
            if (image) {
                updateFields.image = image;
            }
    
            // Find and update the blog post by ID
            const updatedBlogs = await Blogs_Modal.findByIdAndUpdate(
                id,
                updateFields,
                { new: true, runValidators: true } // Options to return the updated document and run validators
            );
    
            // If the blog post is not found
            if (!updatedBlogs) {
                return res.status(404).json({
                    status: false,
                    message: "Blog not found",
                });
            }
    
            // Log the updated blog post for debugging
            console.log("Updated Blog:", updatedBlogs);
    
            // Send the success response
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
            const result = await Blogs_Modal.findByIdAndUpdate(
                id,
                { status: status },
                { new: true } // Return the updated document
            );
      
            if (!result) {
                return res.status(404).json({
                    status: false,
                    message: "Blogs not found"
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

module.exports = new BlogController();
