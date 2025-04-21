import {Image, StyleSheet, Text, View} from 'react-native';
import {InitialProductType} from '../product-list';
import {useTheme} from '@react-navigation/native';
import {
  IconAccountActive,
  IconCheckBox,
  IconDeleteGray,
  IconMinus,
  IconPlus,
  ImageFour,
} from '../../src/assets';
import {Poppins} from '../../src/utils/fonts';
import ButtonIcon from '../button-icon';
import Gap from '../gap';

type CartTypes = {
  data: InitialProductType;
};

const CartProduct = (props: CartTypes): JSX.Element => {
  const {data} = props;
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.sectionCheckBox}>
          <ButtonIcon
            icon={<IconCheckBox width={20} height={20} />}
            styleIcon={styles.styleIcon}
          />
        </View>
        <Gap width={10} />
        <Image source={ImageFour} resizeMode="cover" style={styles.image} />
        <View style={styles.sectionCart}>
          <View style={styles.sectionDesc}>
            <View style={styles.sectionTop}>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                Xbox seris X
              </Text>
              <View>
                <ButtonIcon
                  icon={<IconDeleteGray width={20} height={20} />}
                  styleIcon={styles.styleIcon}
                />
              </View>
            </View>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.desc}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
              obcaecati.
            </Text>
          </View>
          <Gap height={10} />
          <View style={styles.sectionPrice}>
            <View>
              <Text style={styles.price}>$670.00</Text>
            </View>
            <View style={styles.sectionFooter}>
              <ButtonIcon
                icon={<IconMinus width={15} height={15} />}
                styleIcon={styles.styleFooterAction}
              />
              <Gap width={20} />
              <Text style={styles.price}>10</Text>
              <Gap width={20} />
              <ButtonIcon
                icon={<IconPlus width={15} height={15} />}
                styleIcon={styles.styleFooterAction}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartProduct;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sectionCart: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '75%',
      padding: 4,
      flex: 1,
    },
    sectionDesc: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    image: {
      width: '23%',
      height: 85,
      borderRadius: 13,
      marginRight: 10,
    },
    sectionPrice: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontFamily: Poppins.semiBold,
      fontSize: 14,
      color: colors.text,
    },
    desc: {
      fontFamily: Poppins.regular,
      fontSize: 12,
      lineHeight: 20,
      color: colors.textInactive,
    },
    sectionTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    styleIcon: {
      borderWidth: 0,
      borderRadius: 0,
      padding: 0,
    },
    price: {
      fontFamily: Poppins.bold,
      fontSize: 16,
      color: colors.text,
    },
    sectionFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    styleFooterAction: {
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
    },
    sectionCheckBox: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      height: '70%',
    },
  });
};
