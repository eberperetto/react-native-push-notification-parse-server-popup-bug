import PushNotification from 'react-native-push-notification';
import Parse from 'parse/react-native';

export async function configurePushNotifications() {
  // Initialize PushNotification
  await PushNotification.configure({
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      // process the notification
      console.log('NOTIFICATION:', notification);
    },

    onRegister: async function (token) {
      console.log(`Registered with device token ${token.token}`);
      let deviceToken = token.token;

      // Create the notification channel, required for Android notifications
      let channelId = 'guideChannel';
      await PushNotification.createChannel({
        channelId: channelId,
        channelName: 'Guide channel',
      });
      console.log('Notification channel created!');

      // Create a Parse Installation, that will link our application's push notification
      // to the Parse server
      try {
        const installationId = await Parse._getInstallationId();
        const Installation = new Parse.Installation();
        // Make sure to change any needed value from the following
        Installation.set('deviceType', 'android');
        Installation.set('GCMSenderId', 'YOUR_GCM_SENDER_ID');
        Installation.set('pushType', 'gcm');
        Installation.set('appIdentifier', 'com.back4appguidepushnotifications');
        Installation.set('parseVersion', '3.2.0');
        Installation.set('appName', 'Back4AppGuidePushNotifications');
        Installation.set('appVersion', '1.0');
        Installation.set('localeIdentifier', 'pt-BR');
        Installation.set('badge', 0); // Set initial notification badge number
        Installation.set('timeZone', 'America/Sao_Paulo');
        Installation.set('installationId', installationId);
        Installation.set('channels', [channelId]);
        Installation.set('deviceToken', deviceToken);
        await Installation.save();
        console.log(`Created new Parse Installation ${Installation}`);
      } catch (error) {
        console.log(error.message);
      }
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
}

export async function sendNotification() {
  try {
    // This Cloud Code function should be created in your Parse Server
    await Parse.Cloud.run('sendPush');
    console.log('Success!');
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}
