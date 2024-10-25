// E:\StockBox\Backend\App\Controllers\pushnotification.js
const admin = require('firebase-admin');
// const { format, zonedTimeToUtc } = require('date-fns-tz');

// Path to your service account key JSON file
const serviceAccount = {
  "type": "service_account",
  "project_id": "stockbox-15e55",
  "private_key_id": "f32c384cb8d0ba55b383b89431c548905f4ba071",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC45NT+5ICm71MD\nVukyEQ6caFrVnegNykKjcwRHWtzw4E4Bes58wUhhQ0LjnnmSQ6oT/6xZtVjv9Zkk\nN5LrU/92Dh9JO7uJ7LQeIXQ7fF6f/yKssEIjaTvukH/RyxUy42KuFFljeOaBPfXa\n+cCSarCjpN/pMUSyNxWMBL3AanCB+vOJuFYiChkf1FMVmXiidENqQqgkA+eddlzT\nIIKr8aJVeVvwZ7HzcQU6koNwVJLxXzXT7QdYnaEtHaN4GmYUu7fn1O79dMJx3hM6\nPxj0X43va66R2qxu6qTlMRwn5d4JxExYFWbgjKuKWGE6sLISbdW9QSYo6rYSLZEE\nfZVGlZjXAgMBAAECggEAGmfWojSLdHaM2iw+ZP/EoMJ9PobXuP3K40GuOcFDTpoU\n6ecvuDzOaShMVD+yHcPQyscNRp6R/hXgR34xsFmFtsbbjFTzOrEgeYZ47XScpaha\nu7j3KSGCsAEuZWLl5dJNqeOOxJhkAHnoiTEkDIUfhwTT/vTMr9BoIQrITW5Qym8z\nRDUvdiMpPv8Wl90DZ99XXjFv/hbeLqZ7CjjdTyFdzXkN6QjyxnGAumJg8In+vUfC\nEtXeGOlqXkk2ZY8nWUfZiW8Zx2c2pBD7KCMNfnzVVCWRYa/Xj7DQLr88DcfzfMOi\nPktxOW2zn4X+2TokJPGndJpcMIYKTMaOj4iQwwEX6QKBgQDtapIZvZGrejEyvZY/\nC4l1Vs1xqIFKw56EKFxYHYYGvoZCXzVLObXREdRL8/sD1ZpN798038Tr6Z1V7aKh\nBO0MlqwDw6KrSH/KQkvo+wNBQf2SmKP1dLsiSKW0GiBDHtciL25bMaKQWliEjU8H\nEW0EIitBEl5ICCCuElfqWPPUmwKBgQDHXcyPSSXHtfv06T22j6q5Ize0HHxzgkFE\nYo+qE+wbQuJqBgAWyO5YnyTy6K5w562xav+QlqxBHptDBqV5+rkaYiCrz8CMQ3Z3\neMmdPxH/+b5MWeUSugb17YxJgs7ztUckN2T3/BMmbpADED0nH0u7gglkT86Wreqf\nzgoy5QwqdQKBgQCcWzg2/ZLnBMVL7nH5uUZg4bbRqLDlpSlLTi1q1p7C6E0RfxRh\nI3OrafuPvfHNl6pUs6ojb0+IMsWspqEZPF5FkSFeJUSHW2rVsI2/tThyjNxL5Hzu\nlV78+C0xDJe8vJ3gZK5gHrM6MFXljg7Cz+Yk97/WzhsLg1bKbUg7DTQgCwKBgBr+\nvnYgZ3c1UxqEgpC3v1w2QpKm0MsrNf82gVF8RRoj4liM23I6XtutIOmrTAOJu2Es\npdJENKrUpB1dRwbPRkUmSFo7VU0ozV+8AUDDi4JnpLbd7UCt48dlFPvXNIKXZzym\nK4vQnB82FVX02vLzL+QB5ZepnsWUYxKkaYkerpkJAoGBAL7a6QObxOlpIHGmmbPS\nJxV+zo7kapMcnxpcvRDVAtwUurvE84nLMYjjlDJQg31Ll49yvLt5JMMKoiylfd52\nApqFD3LXhgnNKpnPqWa/sGt0Lug+RgiKgaa+38QCBgF0ukXl9SjcesHdbxrPjrkC\na8R+OM0hHqjFd6Q79HGP6+pY\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-1zz93@stockbox-15e55.iam.gserviceaccount.com",
  "client_id": "110503152128356136130",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1zz93%40stockbox-15e55.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

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
