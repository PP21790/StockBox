const admin = require('firebase-admin');
const serviceAccount = require("../../template/stockbox-15e55-firebase-adminsdk-1zz93-b45e3b0c77.json");
//const serviceAccount = require('../../template/stockbox-15e55-firebase-adminsdk-1zz93-f32c384cb8.json');
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Function to send FCM notification
async function sendFCMNotification(title, body, token) {


  const message = {
    token: token,
    notification: {
      title: title,
      body: body,
    },
    data: {
      additional_data: 'value', 
      
    },
  };



  try {
    // Send the notification
    const response = await admin.messaging().send(message);
    console.log('Notification sent successfully:', response);
    return response; // Return response for further processing if needed
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error; // Rethrow the error for handling in the caller
  }
}

// Export the sendFCMNotification function
module.exports = { sendFCMNotification };
