import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {WIDTH} from '../../../config/functions';
type Props = {uriImage?: string};
const ImageSale = (props: Props) => {
  const {uriImage} = props;
  return (
    <View>
      <ImageBackground
        source={{uri: uriImage}}
        style={styles.image}></ImageBackground>
    </View>
  );
};

export default ImageSale;

const styles = StyleSheet.create({
  image: {
    width: WIDTH(100),
    height: WIDTH(100),
  },
});
