import React, { Component } from 'react';
import { View, Text } from 'react-native';
import DogTag from './DogTag';

class CardStack extends Component {
  state = { dogTags: [] };

  componentWillMount() {

  }

  renderDogTags() {
    return (
      <View>
        <DogTag />
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.renderDogTags()}
      </View>
    );
  }
}

export default CardStack;
