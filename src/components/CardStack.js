import React, { Component } from 'react';
import { View, Text } from 'react-native';
import DogTag from './DogTag';

const dogs = [
  {
    _id: 0,
    profile: {
      name: 'Dawg',
      pictures: ['https://facebook.github.io/react/img/logo_og.png'],
      about: "I am a dog, call me Dawg",
      breed: "Pitbull",
      age: 6,
      gender: 'Male'
    }
  }
];

class CardStack extends Component {
  state = {
    x: 0,
    y: 0,
    dogTags: []
  };

  setPosition(e) {
    this.setState({
      x: this.state.x + (e.nativeEvent.pageX - this.drag.x),
      y: this.state.y + (e.nativeEvent.pageY - this.drag.y)
    });

    this.drag.x = e.nativeEvent.pageX;
    this.drag.y = e.nativeEvent.pageY;
  }

  resetPosition(e) {
    this.dragging = false;
    // Reset on release
    this.setState({
      x: 0,
      y: 0,
    })
  }

  onStartShouldSetResponder(e) {
    this.dragging = true;
    // Setup initial drag coordinates
    console.log('dragging');
    this.drag = {
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY
    }
    return true;
  }

  onMoveShouldSetResponder(e) {
    return true;
  }

  getCardStyle() {
    const transform = [{translateX: this.state.x}, {translateY: this.state.y}];
    return {transform: transform};
  }

  renderDogTags() {
    return (
      <DogTag
        dog={dogs[0]}
      />
    );
  }

  render() {
    console.log(this.state);
    console.log(styles.cardStyle);
    return (
      <View
        onResponderMove={this.setPosition.bind(this)}
        onResponderRelease={this.resetPosition.bind(this)}
        onStartShouldSetResponder={this.onStartShouldSetResponder.bind(this)}
        onMoveShouldSetResponder={this.onMoveShouldSetResponder}
        style={this.getCardStyle()}
      >
        {this.renderDogTags()}
      </View>
    );
  }
}

const styles = {
  cardStyle: {

  }
};

export default CardStack;
