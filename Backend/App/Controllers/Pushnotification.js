const admin = require('firebase-admin');
const serviceAccount = require('../../template/stockbox-15e55-firebase-adminsdk-1zz93-a6b89bf4c1.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


async function sendFCMNotification(title, body, tokens, type="") {
  try {

   const tokenss = [...new Set(tokens)];

       const messages = tokenss.map(token => ({
      token: token,
      notification: {
        title: title,
        body: body,
      },
      data: {
        additional_data: 'value',
        type: type, 
      },
      android: {
        priority: "high", // High priority for real-time delivery
        ttl: 3600000, // Time-to-live: 1 hour in milliseconds
      },
      
    }));

    const response = await Promise.all(
      messages.map(message => admin.messaging().send(message))
    );

 // console.log('Notifications sent successfully:', response);
  } catch (error) {
 // console.error('Error sending notifications:', error);
  }
}


module.exports = { sendFCMNotification };
