import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {WIDTH} from '../../../config/functions';
import Feather from 'react-native-vector-icons/Feather';
type Props = {
  text?: string;
  listCheckBox?: boolean[];
};
const TextCheckbox = (props: Props) => {
  const {text = 'Thành viên trực tiếp', listCheckBox = [true, true, false]} =
    props;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16,
      }}>
      <View>
        <Text>{text}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>{listCheckBox.map((element,index)=>)}</View>
    </View>
  );
};

export default TextCheckbox;

const styles = StyleSheet.create({});
