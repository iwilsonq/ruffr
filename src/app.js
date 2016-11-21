import React from 'react';
import { View } from 'react-native';
import { Header } from './components/common';
import CardStack from './components/CardStack';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header headerText={'Ruffr'} />
      <CardStack />
    </View>
  );
}

export default App;
