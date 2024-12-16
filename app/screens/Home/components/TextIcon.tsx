import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
type Props = {
  icon?: string;
  text?: string;
  value?: string;
  containerStyle?: ViewStyle;
};
const TextIcon = (props: Props) => {
  const {
    icon = 'home',
    text = 'Loại phòng',
    value = 'Có',
    containerStyle = styles.containerDefault,
  } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Feather name="home" size={24} color={'gray'} />
        <Text style={styles.text}>{text}</Text>
      </View>
      <Text>{value}</Text>
    </View>
  );
};

export default TextIcon;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', justifyContent: 'space-between'},
  containerDefault: {
    marginHorizontal: 16,
  },
  text: {
    marginLeft: 8,
  },
});
