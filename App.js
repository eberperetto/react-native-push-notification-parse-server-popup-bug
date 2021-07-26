import React from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';
import {
  configurePushNotifications,
  sendNotification,
} from './src/PushNotificationMethods';

// Your Parse initialization configuration goes here
Parse.setAsyncStorage(AsyncStorage);
const PARSE_APPLICATION_ID = 'YOUR_PARSE_APPLICATION_ID';
const PARSE_HOST_URL = 'YOUR_PARSE_HOST_URL';
const PARSE_JAVASCRIPT_ID = 'YOUR_PARSE_JAVASCRIPT_ID';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_ID);
Parse.serverURL = PARSE_HOST_URL;

// Initialize PushNotifications
configurePushNotifications();

const App = () => {
  return (
    <>
      <StatusBar />
      <SafeAreaView>
        <>
          <View style={Styles.header}>
            <Image
              style={Styles.header_logo}
              source={{
                uri: 'https://blog.back4app.com/wp-content/uploads/2019/05/back4app-white-logo-500px.png',
              }}
            />
            <Text style={Styles.header_text}>
              <Text style={Styles.header_text_bold}>
                {'React Native on Back4App - '}
              </Text>
              {' Push Notifications'}
            </Text>
          </View>
          <View style={Styles.wrapper}>
            <Button
              onPress={() => sendNotification()}
              title={'Send notification to myself!'}
            />
          </View>
        </>
      </SafeAreaView>
    </>
  );
};

// These define the screen component styles
const Styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 50,
    backgroundColor: '#208AEC',
  },
  header_logo: {
    height: 50,
    width: 220,
    resizeMode: 'contain',
  },
  header_text: {
    marginTop: 15,
    color: '#f0f0f0',
    fontSize: 16,
  },
  header_text_bold: {
    color: '#fff',
    fontWeight: 'bold',
  },
  wrapper: {
    width: '90%',
    paddingTop: 60,
    alignSelf: 'center',
  },
  submit_button: {
    width: '100%',
    maxHeight: 50,
    alignSelf: 'center',
    backgroundColor: '#208AEC',
  },
});

export default App;
