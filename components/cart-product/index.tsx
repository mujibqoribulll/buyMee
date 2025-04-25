import {Image, StyleSheet, Text, View} from 'react-native';
import {InitialProductType} from '../product-list';
import {useTheme} from '@react-navigation/native';
import {
  IconAccountActive,
  IconCheckBox,
  IconDeleteGray,
  IconMinus,
  IconPlus,
  IconCheckbox,
} from '../../src/assets';
import {Poppins} from '../../src/utils/fonts';
import ButtonIcon from '../button-icon';
import Gap from '../gap';

type CartTypes = {
  data: InitialProductType;
  handleDelete?: (data: any) => void;
  handleIncrease?: (data: any) => void;
  handleDecrease?: (data: any) => void;
  handleCheckBox?: (data: any) => void;
};

const CartProduct = (props: CartTypes): JSX.Element => {
  const {data, handleDelete, handleIncrease, handleDecrease, handleCheckBox} =
    props;
  const styles = useStyles();

  const handleDeleteCart = () => {
    handleDelete?.(data);
  };

  const onPressIncrease = () => {
    handleIncrease?.(data);
  };

  const onPressDecrease = () => {
    handleDecrease?.(data);
  };

  const onPressCheckbox = () => {
    handleCheckBox?.(data);
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.sectionCheckBox}>
          <ButtonIcon
            icon={
              data?.checked ? (
                <IconCheckBox width={20} height={20} />
              ) : (
                <IconCheckbox width={20} height={20} />
              )
            }
            styleIcon={styles.styleIcon}
            onPress={onPressCheckbox}
          />
        </View>
        <Gap width={10} />
        {data?.image && (
          <Image
            source={{uri: data?.image}}
            resizeMode="cover"
            style={styles.image}
          />
        )}

        <View style={styles.sectionCart}>
          <View style={styles.sectionDesc}>
            <View style={styles.sectionTop}>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode="head">
                {data?.title || 'Lorem, ipsum dolor sit amet consectetur'}
              </Text>
              <View style={{height: '100%'}}>
                <ButtonIcon
                  icon={<IconDeleteGray width={20} height={20} />}
                  styleIcon={styles.styleIcon}
                  onPress={handleDeleteCart}
                />
              </View>
            </View>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.desc}>
              {data?.description ||
                'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, reprehenderit.'}
            </Text>
          </View>
          <Gap height={10} />
          <View style={styles.sectionPrice}>
            <View>
              <Text style={styles.price}>$ {data?.price || 0}</Text>
            </View>
            <View style={styles.sectionFooter}>
              <ButtonIcon
                icon={<IconMinus width={15} height={15} />}
                styleIcon={styles.styleFooterAction}
                onPress={onPressDecrease}
              />
              <Gap width={20} />
              <Text style={styles.price}>{data?.qty || 1}</Text>
              <Gap width={20} />
              <ButtonIcon
                icon={<IconPlus width={15} height={15} />}
                styleIcon={styles.styleFooterAction}
                onPress={onPressIncrease}
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
      width: '90%',
    },
    desc: {
      fontFamily: Poppins.regular,
      fontSize: 12,
      lineHeight: 20,
      color: colors.textInactive,
    },
    sectionTop: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 2,
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
