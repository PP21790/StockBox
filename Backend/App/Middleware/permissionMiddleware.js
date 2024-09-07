const { hasPermission } = require('../Utils/permissionHelper'); // Path to your helper

const checkPermission = (permissionName) => {

  return async (req, res, next) => {
    const userId = req.headers['authorization']; // Get userId from headers
    console.log(11111111);
    try {
      const permissionGranted = await hasPermission(userId, permissionName);
    
      if (permissionGranted) {
        next(); // Permission granted, proceed to the route handler
      } else {
        res.status(403).send('Forbidden'); // Permission denied
      }
    } catch (error) {
      console.error("Error checking permission:", error);
      return res.status(500).send('Server error');
    }
  };
};

module.exports = { checkPermission };
