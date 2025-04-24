import {useTheme} from '@react-navigation/native';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import {IconStar, ImageFour} from '../../src/assets';
import Gap from '../gap';
import {Poppins} from '../../src/utils/fonts';
import {useState} from 'react';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type InitialProductType = {
  id?: number;
  title: string;
  price: number;
  rating: number;
  images: string;
};

type ProductTypes = {
  data: InitialProductType;
  onPress: (event: GestureResponderEvent) => void;
};

const CardProduct = (props: ProductTypes): JSX.Element => {
  const {data, onPress} = props;
  const {width} = useWindowDimensions();
  const styles = useStyles(width);
  const [loading, setLoading] = useState(true);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        {loading ? (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
              <SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item
                  width={200}
                  height={150}
                  borderTopEndRadius={20}
                  borderBottomEndRadius={20}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        ) : (
          <View style={styles.card}>
            {/* image */}
            <Image
              source={{uri: data?.images?.[0]}}
              resizeMode="contain"
              style={styles.image}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
            />
          </View>
        )}
        <View style={styles.wrapperContent}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {data?.title}
          </Text>
          <View style={styles.wrapperRate}>
            <IconStar />
            <Gap width={6} />
            <Text style={styles.rate}>{data.rating}</Text>
          </View>
        </View>
        <Text style={styles.price}>${data.price}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default CardProduct;

const useStyles = (width: any) => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      justifyContent: 'center',
      width: width / 2,
    },
    card: {
      borderRadius: 20,
      overflow: 'hidden',
      marginBottom: 7,
    },
    image: {
      width: width / 2 - 20,
      height: 170,
    },
    wrapperContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
      paddingHorizontal: 5,
    },
    name: {
      fontSize: 13,
      fontFamily: Poppins.regular,
      color: colors.textInactive,
      width: width / 2 - 70,
    },
    rate: {
      fontSize: 14,
      fontFamily: Poppins.bold,
      color: colors.text,
    },
    price: {
      fontSize: 16,
      color: colors.text,
      fontFamily: Poppins.bold,
    },
    wrapperRate: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
};
