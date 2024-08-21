const db = require("../Models");
const upload = require('../Utils/multerHelper'); // Import the multer helper

const BasicSetting_Modal = db.BasicSetting;

class BasicSetting {


    async AddBasicSetting(req, res) {
        try {
            // Handle the image uploads
            upload('basicsetting').fields([{ name: 'favicon', maxCount: 1 }, { name: 'logo', maxCount: 1 }])(req, res, async (err) => {
                if (err) {
                    return res.status(500).json({ status: false, message: "File upload error", error: err.message });
                }

                const {
                    website_title,
                    email_address,
                    contact_number,
                    address,
                    smtp_status,
                    smtp_host,
                    smtp_port,
                    encryption,
                    smtp_username,
                    smtp_password,
                    from_mail,
                    from_name,
                    to_mail,
                    refer_title,
                    refer_description,
                    sender_earn,
                    receiver_earn
                } = req.body;

                // Get the uploaded file paths
                const favicon = req.files['favicon'] ? req.files['favicon'][0].filename : null;
                const logo = req.files['logo'] ? req.files['logo'][0].filename : null;

                // Define the update payload
                const update = {
                    favicon,
                    logo,
                    website_title,
                    email_address,
                    contact_number,
                    address,
                    smtp_status,
                    smtp_host,
                    smtp_port,
                    encryption,
                    smtp_username,
                    smtp_password,
                    from_mail,
                    from_name,
                    to_mail,
                    refer_title,
                    refer_description,
                    sender_earn,
                    receiver_earn
                };

                // Upsert the setting
                const options = {
                    new: true,
                    upsert: true,
                    runValidators: true
                };

                const result = await BasicSetting_Modal.findOneAndUpdate({}, update, options);

                return res.status(200).json({
                    status: true,
                    message: "Basic setting added/updated successfully",
                    data: result
                });
            });
        } catch (error) {
            console.error("Error adding/updating basic setting:", error);
            return res.status(500).json({
                status: false,
                message: "Server error",
                error: error.message
            });
        }
    }

    // Additional methods can be defined here...

    // Example method to get all settings
    async getSettings(req, res) {
        try {
            const settings = await BasicSetting_Modal.find();  // Correct reference here
            return res.json({
                status: true,
                message: "Settings retrieved successfully",
                data: settings
            });
        } catch (error) {
            console.error("Error retrieving settings:", error);
            return res.status(500).json({
                status: false,
                message: "Server error",
                error: error.message
            });
        }
    }


  }
  module.exports = new BasicSetting();