import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import DogTag from './DogTag';

const Dimensions = require('Dimensions');
const windowSize = Dimensions.get('window');

const Woof = ({opacity}) => {
  return (
    <Image
      source={{ uri: "http://localhost:3000/images/woof.png" }}
      alt="woof"
      style={[ {opacity}, {...styles.woofStyle}]}
    />
  );
};

const Grr = ({opacity}) => {
  return (
    <Image
      source={{ uri: "http://localhost:3000/images/grr.png" }}
      alt="grr"
      style={[ {opacity}, {...styles.grrStyle}]}
    />
  );
};

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
    const { x, y } = this.state;

    this.setState({
      x: x + (e.nativeEvent.pageX - this.drag.x),
      y: y + (e.nativeEvent.pageY - this.drag.y)
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
    const { currentIndex, dogs, x, y } = this.state;
    const opacity = Math.abs(x) / 90;
    return (
      <View>
        <DogTag
          dog={dogs[currentIndex]}
        />
        { (x > 0 && this.dragging) ? <Woof opacity={opacity} /> : null }
        { (x < 0 && this.dragging) ? <Grr opacity={opacity} /> : null }
      </View>

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
    zIndex: 1,
    width: windowSize.width
  },
  grrStyle: {
    position: 'absolute',
    top: 40,
    right: 15,
    zIndex: 2,
    height: 55,
    width: windowSize.width / 3,
    transform: [{rotate: '20deg'}]
  },
  woofStyle: {
    position: 'absolute',
    top: 40,
    left: 15,
    zIndex: 2,
    height: 55,
    width: windowSize.width / 3,
    transform: [{rotate: '-20deg'}]
  }
};

export default CardStack;
