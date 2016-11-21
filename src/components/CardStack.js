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
      pictures: ['tigger.jpg'],
      about: 'I am a dog, call me Dawg',
      breed: 'Pitbull',
      age: 6,
      gender: 'Male'
    }
  },
  {
    _id: 1,
    profile: {
      name: 'Alex',
      pictures: ['alex.jpg'],
      about: 'I am a husky, my name is Alex',
      breed: 'Siberian Husky',
      age: 7,
      gender: 'Male'
    }
  },
  {
    _id: 2,
    profile: {
      name: 'Dashund',
      pictures: ['dashund.jpg'],
      about: 'Lookit me im mr meeseeks',
      breed: 'Weiner Dog',
      age: 3,
      gender: 'Female'
    }
  }
];

class CardStack extends Component {
  state = {
    x: 0,
    y: 0,
    dogTags: [],
    currentIndex: 0,
    lastDragDirection: 'Drag and Release'
  };

  componentDidMount() {
    this.setState({
      dogTags: dogs
    });
  }

  updateCurrentIndex() {
    const { currentIndex } = this.state;

    if (dogs[currentIndex + 1]) {
      this.setState({
        currentIndex: currentIndex + 1
      });
    } else {
      this.setState({
        currentIndex: 0
      });
    }
  }

  setPosition(e) {
    this.setState({
      x: this.state.x + (e.nativeEvent.pageX - this.drag.x),
      y: this.state.y + (e.nativeEvent.pageY - this.drag.y)
    });

    this.drag.x = e.nativeEvent.pageX;
    this.drag.y = e.nativeEvent.pageY;
  }

  resetPosition(e) {
    const { x, currentIndex } = this.state;
    this.dragging = false;

    const left = e.nativeEvent.pageX < (windowSize.width/2),
          displayText = left ? 'Released left' : 'Released right';

    this.setState({
      x: 0,
      y: 0,
      lastDragDirection: displayText
    });

    if (x < -90 || x > 90) {
      this.updateCurrentIndex();
    }
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

    return { transform };
  }

  renderDogTags() {
    return (
      <DogTag
        dog={dogs[this.state.currentIndex]}
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
