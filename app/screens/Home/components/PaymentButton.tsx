import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {getFont, HEIGHT, WIDTH} from '../../../config/functions';

type ButtonProps = {
  icon?: string;
  typeIcon?: 'SCORE' | 'MONEY' | 'BANK';
  value?: string | number;
  onCheckBox?: () => void;
  isSelect?: boolean;
  bankCountNumber?: string;
  bankName?: string;
  containerStyle?: ViewStyle;
};

const PaymentButton: React.FC<ButtonProps> = ({
  icon = require('../../../assets/images/ItemOrder/vietcombank.png'),
  typeIcon = 'SCORE',
  value = '105000',
  onCheckBox,
  isSelect,
  bankCountNumber = '10386939291',
  bankName = 'VCBank',
  containerStyle,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const valueReturn = `${
    typeIcon === 'SCORE'
      ? value + ' điểm'
      : typeIcon === 'MONEY'
      ? value + ' vnđ'
      : ''
  }`;

  const IconView = () => {
    const icons = {
      SCORE: (
        <Image
          resizeMode="center"
          style={{
            height: HEIGHT(24),
            width: WIDTH(24),
          }}
          source={require('../../../assets/images/ItemOrder/score.png')}
        />
      ),
      MONEY: <Feather name="dollar-sign" size={24} color="#000" />,
      BANK: (
        <Image
          resizeMode="center"
          style={{
            height: HEIGHT(24),
            width: WIDTH(24),
          }}
          source={icon}
        />
      ),
    };
    return icons[typeIcon];
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelect && styles.containerSelect,
        containerStyle,
      ]}
      onPress={() => {
        setIsChecked(!isChecked);
        onCheckBox?.();
      }}>
      <View style={styles.row}>
        <IconView />
        {typeIcon === 'BANK' ? (
          <View style={{marginLeft: 12}}>
            <Text style={styles.bankCount}>{bankCountNumber}</Text>
            <Text style={styles.bankName}>{bankName}</Text>
          </View>
        ) : (
          <Text style={styles.amount}>{valueReturn}</Text>
        )}
      </View>
      <View style={[styles.checkbox, isChecked && styles.checked]} />
    </TouchableOpacity>
  );
};

export default PaymentButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: HEIGHT(8),
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: WIDTH(16),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    height: HEIGHT(48),
  },
  containerSelect: {
    borderColor: 'yellow',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  checkbox: {
    width: WIDTH(16),
    height: WIDTH(16),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {},
  bankCount: {
    fontWeight: 'bold',
    color: '#000',
  },
  bankName: {
    fontSize: getFont(12),
  },
});
