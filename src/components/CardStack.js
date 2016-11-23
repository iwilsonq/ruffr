import React, { Component } from 'react';
import { View, Text } from 'react-native';
import DogTag from './DogTag';

const Dimensions = require('Dimensions');
const windowSize = Dimensions.get('window');

class CardStack extends Component {
  state = {
    x: 0,
    y: 0,
    dogs: [],
    currentIndex: 0,
    lastDragDirection: 'Drag and Release'
  };

  componentDidMount() {
    fetch('http://localhost:3000')
      .then(result => result.json())
      .then(dogs => this.setState({ dogs }, () => console.log(dogs)));
  }

  updateCurrentIndex() {
    const { currentIndex, dogs } = this.state;

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

    return [{ transform }, styles.cardStyle];
  }

  renderDogTag() {
    const { currentIndex, dogs } = this.state;
    return (
      <DogTag
        dog={dogs[currentIndex]}
      />
    );
  }

  renderNext() {
    const { currentIndex, dogs } = this.state;
    if (dogs[currentIndex + 1]) {
      return (
        <DogTag
          dog={dogs[this.state.currentIndex + 1]}
        />
      );
    } else {
      return (
        <DogTag
          dog={dogs[0]}
        />
      );
    }

  }

  render() {
    console.log(this.state);
    return (
      <View>
        {this.renderNext()}
        <View
          onResponderMove={this.setPosition.bind(this)}
          onResponderRelease={this.resetPosition.bind(this)}
          onStartShouldSetResponder={this.onStartShouldSetResponder.bind(this)}
          onMoveShouldSetResponder={this.onMoveShouldSetResponder}
          style={this.getCardStyle()}
        >
          {this.renderDogTag()}
        </View>
      </View>

    );
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    top: 0,
    width: windowSize.width
  }
};

export default CardStack;
