// E:\StockBox\Backend\App\Controllers\pushnotification.js
const admin = require('firebase-admin');


const serviceAccount = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;
// Path to your service account key JSON file
// const serviceAccount = require('../../template/stockbox-15e55-firebase-adminsdk-1zz93-7b2ff8472b.json');

console.log('aaaaa',serviceAccount);
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
      additional_data: 'value', // Optional additional data
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
