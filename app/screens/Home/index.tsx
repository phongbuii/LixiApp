import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

// Kích thước màn hình
const { width, height } = Dimensions.get('window');

// Danh sách phần thưởng
const PRIZES = [
  { id: 1, name: 'Xe máy', value: 'Xe máy' },
  { id: 2, name: 'Điện thoại', value: 'Điện thoại' },
  { id: 3, name: '500.000đ', value: '500.000đ' },
  { id: 4, name: 'Tai nghe', value: 'Tai nghe' },
  { id: 5, name: '200.000đ', value: '200.000đ' },
  { id: 6, name: 'Voucher', value: 'Voucher' },
];

const Home = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const spinValue = useRef(new Animated.Value(0)).current;

  // Chọn phần thưởng ngẫu nhiên
  const selectRandomPrize = () => {
    const randomIndex = Math.floor(Math.random() * PRIZES.length);
    return PRIZES[randomIndex];
  };

  // Thực hiện quay vòng
  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    setResult(null);

    // Số vòng quay + góc quay cuối cùng
    const totalRotation = Math.random() * Math.PI * 2 + Math.PI * 10;

    Animated.timing(spinValue, {
      toValue: totalRotation,
      duration: 5000,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        const prize = selectRandomPrize();
        setResult(prize);
        setSpinning(false);
      }
    });
  };

  // Reset vòng quay
  const resetWheel = () => {
    spinValue.setValue(0);
    setResult(null);
  };

  // Render góc của từng phần thưởng
  const renderWheelSectors = () => {
    const sectorAngle = (Math.PI * 2) / PRIZES.length;
    
    return PRIZES.map((prize, index) => {
      const rotation = index * sectorAngle;
      const backgroundColor = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', 
        '#FDCB6E', '#6C5CE7', '#FF8A5B'
      ][index % 6];

      return (
        <Animated.View
          key={prize.id}
          style={[
            styles.sector,
            { 
              transform: [
                { rotate: `${rotation}rad` },
                { 
                  translateX: width * 0.25 * Math.cos(rotation + sectorAngle / 2) 
                },
                { 
                  translateY: width * 0.25 * Math.sin(rotation + sectorAngle / 2) 
                }
              ]
            }
          ]}
        >
          <Text style={styles.sectorText}>{prize.name}</Text>
        </Animated.View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vòng Quay May Mắn</Text>
      
      <View style={styles.wheelContainer}>
        {/* Mũi tên chỉ */}
        <View style={styles.pointer} />
        
        {/* Vòng quay */}
        <Animated.View 
          style={[
            styles.wheel,
            { 
              transform: [
                { 
                  rotate: spinValue.interpolate({
                    inputRange: [0, Math.PI * 2],
                    outputRange: ['0deg', '360deg']
                  }) 
                }
              ] 
            }
          ]}
        >
          {renderWheelSectors()}
        </Animated.View>
      </View>

      {/* Nút quay */}
      <TouchableOpacity 
        style={styles.spinButton} 
        onPress={spinWheel}
        disabled={spinning}
      >
        <Text style={styles.spinButtonText}>
          {spinning ? 'Đang quay...' : 'Quay'}
        </Text>
      </TouchableOpacity>

      {/* Hiển thị kết quả */}
      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Chúc mừng! Bạn trúng: {result.name}
          </Text>
          <TouchableOpacity 
            style={styles.resetButton} 
            onPress={resetWheel}
          >
            <Text style={styles.resetButtonText}>Chơi lại</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  wheelContainer: {
    width: width * 0.8,
    height: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheel: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(0,0,0,0.1)',
    position: 'relative',
  },
  sector: {
    position: 'absolute',
    width: width * 0.5,
    height: width * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    transformOrigin: 'center',
  },
  sectorText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  pointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 20,
    borderBottomWidth: 40,
    borderLeftWidth: 20,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red',
    borderLeftColor: 'transparent',
    position: 'absolute',
    top: -40,
    zIndex: 2,
  },
  spinButton: {
    marginTop: 30,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  spinButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    color: '#333',
    marginBottom: 15,
  },
  resetButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Home;

// Cách sử dụng trong App.js
// import LuckyWheel from './LuckyWheel';
// export default function App() {
//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <LuckyWheel />
//     </SafeAreaView>
//   );
// }