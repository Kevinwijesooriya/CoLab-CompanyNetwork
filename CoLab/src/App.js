import React from 'react';
import Routes from './Routes';
import { SafeAreaView, StatusBar } from 'react-native';

const App = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'rgb(255, 255, 255)' }}
      forceInset={{ bottom: 'always', top: 'always' }}>
      <StatusBar backgroundColor="rgb(50, 50, 50)" barStyle="dark-content" />
      <Routes />
    </SafeAreaView>
  );
};

export default App;
