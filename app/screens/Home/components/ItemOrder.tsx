import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
  ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getFont, HEIGHT, WIDTH} from '../../../config/functions';
import Rating from '../../components/Rating';
import ImageSale from './ImageSale';

interface TourItemProps {
  title: string;
  duration?: string;
  startDate?: string;
  sold?: string;
  rating?: number;
  onIconShop?: () => void;
  onIconHeart?: () => void;
  uriImage?: string;
  company?: string;
  originalPrice?: string;
  price?: string;
  containerStyle?: ViewStyle;
}

const TourItem: React.FC<TourItemProps> = ({
  uriImage = 'https://via.placeholder.com/150',
  title,
  sold = 1234,
  rating,
  onIconHeart,
  onIconShop,
  company = 'Nghiêm Complex',
  originalPrice = 669,
  price = 339,
  containerStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.container, containerStyle]}>
      <ImageSale uriImage={uriImage} />
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.info}>
          <View style={styles.infoRow}>
            <Feather name="git-pull-request" size={WIDTH(16)} color={'blue'} />
            <Text> {company}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.regularPrice}>{originalPrice}k</Text>
            <Text style={styles.discountedPrice}>{price}k</Text>
          </View>
        </View>
        <View style={styles.actionContainer}>
          <Rating
            maxStars={5}
            initialRating={rating || 0}
            onRatingChange={() => {}}
            starSize={16}
          />
          <Text style={styles.price}>Đã bán: {sold}</Text>
          <TouchableOpacity onPress={onIconHeart}>
            <AntDesign
              name={false ? 'heart' : 'hearto'}
              size={HEIGHT(16)}
              color={true ? 'red' : 'gray'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onIconShop}>
            <Feather name={'shopping-cart'} size={HEIGHT(16)} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TourItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: WIDTH(100),
    height: WIDTH(100),
  },
  details: {
    flex: 1,
    paddingHorizontal: WIDTH(16),
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  regularPrice: {
    color: 'gray',
    marginRight: 8,
    fontSize: getFont(12),
  },
  discountedPrice: {
    color: 'black',
    fontWeight: 'bold',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 12,
    color: 'gray',
  },
});
