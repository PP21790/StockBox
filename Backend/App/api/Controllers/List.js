const db = require("../../Models");

const BasicSetting_Modal = db.BasicSetting;
const Banner_Modal = db.Banner;
const Blogs_Modal = db.Blogs;
const News_Modal = db.News;
class List {


    async Bannerlist(req, res) {
        try {

            const banners = await Banner_Modal.find({ del: false,status: true });
            const baseUrl = `${req.headers.host}`;

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
            const baseUrl = `${req.headers.host}`;

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

            const baseUrl = `${req.headers.host}`;

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



}
module.exports = new List();