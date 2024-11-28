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
