const db = require("../Models");
const Users_Modal = db.Users;

const hasPermission = async (userId, permissionName) => {
  try {
    const user = await Users_Modal.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }
  
    if (user.Role === '1') {
      return true;
    } else if (user.Role === '2') {
       
      return user.permissions.includes(permissionName);
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking permission:", error);
    throw new Error('Server error');
  }
};

module.exports = { hasPermission };
