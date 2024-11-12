const admin = require('firebase-admin');
const serviceAccount = require('../../template/stockbox-15e55-firebase-adminsdk-1zz93-c91de27a7e.json');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  console.log('Initializing Firebase Admin SDK...');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('Firebase Admin SDK initialized.');
}

// Function to send FCM notification to multiple clients
async function sendFCMNotification(title, body, tokens) {
  // Create an array of message objects for each token
  const results = [];

  for (const token of tokens) {
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
      const response = await admin.messaging().send(message);
      console.log('Notification sent successfully:', response);
      results.push({ token, success: true });

    } catch (error) {
      console.error(`Error sending notification to ${token}:`, error);
      results.push({ token, success: false, error });
    }
  }

  return results;
  
}

module.exports = { sendFCMNotification };
