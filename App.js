
import React,{useEffect} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from './src/Redux/Store/Index'
import MainStack from './src/Stacks/MainStack';
import dynamicLinks from '@react-native-firebase/dynamic-links';


const App = () => {

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (link?.url === 'https://salesforcedemo.page.link') {
          // ...set initial route as offers screen

        }
      });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainStack />
      </PersistGate>
    </Provider>

  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
