// E:\StockBox\Backend\App\Controllers\pushnotification.js
const admin = require('firebase-admin');
// const { format, zonedTimeToUtc } = require('date-fns-tz');

// Path to your service account key JSON file

const serviceAccount =""

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Function to send FCM notification
async function sendFCMNotification(title, body, token) {



  // const now = new Date();
  // const istTime = zonedTimeToUtc(now, 'Asia/Kolkata');
  // const formattedTime = format(istTime, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: 'Asia/Kolkata' });


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
