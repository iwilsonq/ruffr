import React from 'react';
import { Text, Image } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';

const DogTag = () => {
  return (
    <Card>
      <CardSection>
        <Image
          style={styles.imageStyle}
          source={{
            uri: 'https://facebook.github.io/react/img/logo_og.png' }}
        />
      </CardSection>
      <CardSection>
        <Text>The Dawg</Text>
      </CardSection>
    </Card>
  );
};

const styles = {
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
}

export default DogTag;
