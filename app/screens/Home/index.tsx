import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {getFont, getWidth, HEIGHT, WIDTH} from '../../config/functions';
import ItemOrder from './components/ItemOrder';
import PaymentButton from './components/PaymentButton';
import TextIcon from './components/TextIcon';
import LineChartComponent from './components/LineChart';
import TextCheckbox from './components/TextCheckbox';
type IITEM = {
  title?: string;
  describe?: string;
  screen?: string;
};
const Home = () => {
  const DATA: IITEM[] = [
    {
      title: 'ItemOrder',
      describe: '',
      screen: 'Quà tặng ,Bán hàng ,Voucher,Thanh Toán và mua sắm ,Mua voucher',
    },
    {
      title: 'PaymentButton',
      describe: '',
      screen: 'Thanh toán & mua sắm ,Điểm,Ví,Home',
    },
    {
      title: 'TextIcon',
      describe: '',
      screen: '',
    },
  ];
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        {DATA.map((item: IITEM, index: number) => {
          return (
            <View key={`a${index}`}>
              <TouchableOpacity
                style={{
                  marginHorizontal: WIDTH(16),
                  paddingHorizontal: WIDTH(16),
                  borderWidth: 1,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: getFont(18),
                    fontWeight: '900',
                  }}>
                  {item.title}
                </Text>
                <Text>{item.screen}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
        <View style={{paddingVertical: HEIGHT(20)}}>
          <ItemOrder
            startDate="1666666"
            price="339"
            key={`1`}
            duration=""
            rating={5}
            title={'Tour nghỉ dưỡng Nghiên Săn Mây Sapa 2 ngày 1 đêm '}
          />
        </View>
        <View style={{paddingVertical: HEIGHT(12)}}>
          <PaymentButton />
          <PaymentButton typeIcon="MONEY" isSelect={true} />
          <PaymentButton containerStyle={{marginBottom: 16}} typeIcon="BANK" />
          <TextIcon />
          <TextIcon value="123.5554" />
          <TextIcon />
          <LineChartComponent />
          <TextCheckbox
            text="My Custom Text"
            listCheckBox={[true, false, true]}
            onCheckboxPress={index => {
              // Handle checkbox press
              console.log(`Checkbox ${index} pressed`);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
