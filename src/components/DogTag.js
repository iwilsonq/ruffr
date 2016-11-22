import React, { Component } from 'react';
import { View, Text, Image, PanResponder } from 'react-native';
import { Card, CardSection, Spinner } from './common'
import ImageSection from './ImageSection';

class DogTag extends Component {

  render() {
    const { nameStyle, genderStyle, imageStyle } = styles;

    if (this.props.dog) {
      const { name, age, pictures, breed, about, gender } = this.props.dog;

      return (
          <Card>
            <ImageSection>
              <Image
                style={imageStyle}
                source={{ uri: `http://localhost:8081/images/${pictures[0]}` }}
              />
            </ImageSection>
            <CardSection>
              <Text style={nameStyle}>{name}, {age} </Text>
              <Text style={genderStyle}>{gender}</Text>
            </CardSection>
            <CardSection>
              <Text>{breed}</Text>
            </CardSection>

            <CardSection>
              <Text>{about}</Text>
            </CardSection>
          </Card>
      );
    }
    return <Spinner size={'large'} />
  }
};

const styles = {
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  },
  nameStyle: {
    fontSize: 20
  },
  genderStyle: {
    justifyContent: 'flex-end',

  }
}

export default DogTag;
