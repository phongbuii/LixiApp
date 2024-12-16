import React, {memo} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface TextCheckboxProps {
  text?: string;
  listCheckBox?: boolean[];
  styleContainer?: ViewStyle;
  onCheckboxPress?: (index: number) => void;
}

const TextCheckbox: React.FC<TextCheckboxProps> = memo(
  ({
    text = 'Thành viên trực tiếp',
    listCheckBox = [true, true, false],
    styleContainer,
    onCheckboxPress,
  }) => {
    const containerStyle = [styles.container, styleContainer];

    return (
      <View style={containerStyle}>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.checkboxContainer}>
          {listCheckBox.map((isChecked, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onCheckboxPress?.(index)}
              disabled={onCheckboxPress === undefined}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              style={styles.checkboxTouch}>
              <Feather
                name={isChecked ? 'check-square' : 'square'}
                size={16}
                color={'#8e8e93'}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  text: {
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
  },
  checkboxTouch: {
    marginLeft: 8,
  },
});

export default TextCheckbox;
