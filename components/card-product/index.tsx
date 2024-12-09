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

type InitialProductType = {
  id?: number;
  name: string;
  price: number;
  rating: number;
  image: string;
};

type ProductTypes = {
  data: InitialProductType;
  onPress: (event: GestureResponderEvent) => void;
};

const CardProduct = (props: ProductTypes): JSX.Element => {
  const {data, onPress} = props;

  const {width} = useWindowDimensions();
  const styles = useStyles(width);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* image */}
          <Image source={ImageFour} resizeMode="cover" style={styles.image} />
        </View>
        <View style={styles.wrapperContent}>
          <Text style={styles.name}>{data?.name}</Text>
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
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    card: {
      width: width / 2 - 30,
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
      width: width / 2 - 30,
      marginBottom: 6,
      paddingHorizontal: 5,
    },
    name: {
      fontSize: 13,
      fontWeight: '400',
      color: colors.textInactive,
    },
    rate: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    price: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    wrapperRate: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
};
