import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface RatingProps {
  /** Tổng số sao */
  maxStars?: number;
  /** Giá trị rating ban đầu */
  initialRating?: number;
  /** Kích thước sao */
  starSize?: number;
  /** Màu sao khi được chọn */
  activeColor?: string;
  /** Màu sao khi chưa được chọn */
  inactiveColor?: string;
  /** Hàm callback khi rating thay đổi */
  onRatingChange?: (rating: number) => void;
  /** Style container */
  containerStyle?: StyleProp<ViewStyle>;
}

const Rating: React.FC<RatingProps> = ({
  maxStars = 5,
  initialRating = 0,
  starSize = 0,
  activeColor = '#FFD700', // Màu vàng gold
  inactiveColor = '#E0E0E0', // Màu xám nhạt
  onRatingChange,
  containerStyle,
}) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarPress = (selectedRating: number) => {
    setRating(selectedRating);
    onRatingChange?.(selectedRating);
  };

  return (
    <View style={[containerStyle, styles.container]}>
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <TouchableOpacity
            disabled={true}
            key={index}
            onPress={() => handleStarPress(starValue)}
            activeOpacity={0.7}>
            <AntDesign
              size={starSize}
              color={starValue <= rating ? activeColor : inactiveColor}
              name="star"
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Rating;
