const db = require("../Models");
const Users_Modal = db.Users;
const Clients_Modal = db.Clients;
const Service_Modal = db.Service;
const Plan_Modal = db.Plan;
const Signal_Modal = db.Signal;


class Dashboard {


    async getcount(req, res) {
        try {
            // Count documents in the Clients_Modal collection where del is false
            const client = await Clients_Modal.countDocuments({ del: 0 });
            const user = await Users_Modal.countDocuments({ del: 0 });
            const clientactive = await Clients_Modal.countDocuments({ del: 0,ActiveStatus:1 });
            const useractive = await Users_Modal.countDocuments({ del: 0,ActiveStatus:1 });

            const plan = await Plan_Modal.countDocuments({ del: false });
            const activeplan = await Plan_Modal.countDocuments({ del: false,status:"active" });

            const opensignal = await Signal_Modal.countDocuments({ close_status: false });
            const closesignal = await Signal_Modal.countDocuments({ close_status: true });

            const result = await Clients_Modal.find({ del: 0 })
    .sort({ _id: -1 })
    .limit(10);
    
            return res.json({
                status: true,
                message: "Count retrieved successfully",
                data: {
                    clientCountTotal: client,
                    userCountTotal: user,
                    clientCountActive: clientactive,
                    userCountActive: useractive,
                    PlanCountTotal: plan,
                    PlanCountActive: activeplan,
                    OpensignalCountTotal: opensignal,
                    CloseSignalCountTotal: closesignal,
                    Clientlist: result
                }
            });
    
        } catch (error) {
            return res.json({ status: false, message: "Server error", data: [] });
        }
    }
  
 
}
module.exports = new Dashboard();