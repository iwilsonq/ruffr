import React, { Component } from 'react';
import { Text, Image, PanResponder } from 'react-native';
import Card from './Card';
import ImageSection from './ImageSection';
import CardSection from './CardSection';

class DogTag extends Component {

  render() {
    const { name, age, pictures, breed, about, gender } = this.props.dog.profile;
    return (
      <Card>
        <ImageSection>
          <Image
            style={styles.imageStyle}
            source={{
              uri: pictures[0] }}
          />
        </ImageSection>
        <CardSection>
          <Text style={styles.nameStyle}>{name}, {age} </Text>
          <Text style={styles.genderStyle}>{gender}</Text>
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
};

const styles = {
  cardStyle: {

  },
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
