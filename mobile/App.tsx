import { useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold, 
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';

import { Background } from './src/components/Background';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

import './src/services/notificationConfigs';
import getPushNotificationToken from './src/services/getPushNotificationToken';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold, 
    Inter_700Bold,
    Inter_900Black,
  });

 

  const getNotificationListerner = useRef<Subscription>();
  const responseNotificationListerner = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  });

  useEffect(() => {
    // Interface para testes de notificações => https://expo.dev/notifications
    getNotificationListerner.current = Notifications
      .addNotificationReceivedListener(not => console.log(not));
    
    responseNotificationListerner.current = Notifications
      .addNotificationResponseReceivedListener(res => console.log(res));
    
    return () => {
      if (getNotificationListerner.current && responseNotificationListerner.current) {
        Notifications.removeNotificationSubscription(getNotificationListerner.current);
        Notifications.removeNotificationSubscription(responseNotificationListerner.current);
      }
    }
  }, []);

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {fontsLoaded ? <Routes/> : <Loading />}

    </Background>
  );
}

