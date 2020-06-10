import React from 'react';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';

import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';

import Routes from './src/routes';

//backgroundColor='transparent' e translucent só funcionam no android
export default function App() {

  let [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Ubuntu_700Bold });

  //Enquanto as fontes ainda não tiverem sido carregadas
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <>
        <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
        <Routes />
      </>
    )
  }
}