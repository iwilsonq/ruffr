// Import a library to help create a Component
import React from 'react';
import { AppRegistry, View } from 'react-native';
import Header from './src/components/Header';
import CardStack from './src/components/CardStack';

// Create a component
const App = () => (
  <View style={{ flex: 1 }}>
    <Header headerText={'Ruffr'} />
    <CardStack />
  </View>
);

AppRegistry.registerComponent('ruffr', () => App);
