import React, { Component } from 'react';
import { View, Text } from 'react-native';
import DogTag from './DogTag';

const Dimensions = require('Dimensions');
const windowSize = Dimensions.get('window');

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
    dogTags: [],
    lastDragDirection: 'Drag and Release'
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

    const left = e.nativeEvent.pageX < (windowSize.width/2),
          displayText = left ? 'Released left' : 'Released right';

    this.setState({
      x: 0,
      y: 0,
      lastDragDirection: displayText
    })
  }

  onStartShouldSetResponder(e) {
    this.dragging = true;

    this.rotateTop = e.nativeEvent.locationY <= 200;

    this.drag = {
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY
    }
    return true;
  }

  onMoveShouldSetResponder(e) {
    return true;
  }

  getRotationDegree(rotateTop, x) {
    const rotation = (x / windowSize.width * 100) / 3;
    const rotate = rotateTop ? 1 : -1,
          rotateString = (rotation * rotate) + 'deg';

    return rotateString;
  }

  getCardStyle() {
    const transform = [{translateX: this.state.x}, {translateY: this.state.y}];

    if (this.dragging) {
      transform.push({ rotate: this.getRotationDegree(this.rotateTop, this.state.x) })
    }

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
