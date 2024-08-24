const db = require("../Models");
const Users_Modal = db.Users;
const Clients_Modal = db.Clients;
const Service_Modal = db.Service;


class Dashboard {

    

    async getclientcount(req, res) {
        try {
            // Count documents in the Clients_Modal collection where del is false
            const count = await Clients_Modal.countDocuments({ del: false });
    
            return res.json({
                status: true,
                message: "Count retrieved successfully",
                data: count
            });
    
        } catch (error) {
            return res.json({ status: false, message: "Server error", data: [] });
        }
    }
    async getusercount(req, res) {
        try {
            // Count documents in the Clients_Modal collection where del is false
            const count = await Service_Modal.countDocuments({ del: false });
    
            return res.json({
                status: true,
                message: "Count retrieved successfully",
                data: count
            });
    
        } catch (error) {
            return res.json({ status: false, message: "Server error", data: [] });
        }
    }
    async getservicecount(req, res) {
        try {
            // Count documents in the Clients_Modal collection where del is false
            const count = await Users_Modal.countDocuments({ del: 0 });
    
            return res.json({
                status: true,
                message: "Count retrieved successfully",
                data: count
            });
    
        } catch (error) {
            return res.json({ status: false, message: "Server error", data: [] });
        }
    }
 
  
  
 
}
module.exports = new Dashboard();