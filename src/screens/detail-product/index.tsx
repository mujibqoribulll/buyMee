import {SafeAreaView} from 'react-native-safe-area-context';
import {
  IconArrowLeft,
  IconCart,
  IconDeliver,
  IconLove,
  IconPercent,
  IconStar,
  IconUpload,
} from '../../assets';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {useRoute, useTheme} from '@react-navigation/native';
import {ImageFour} from '../../assets';
import ButtonIcon from '../../../components/button-icon';
import Gap from '../../../components/gap';
import ButtonIconText from '../../../components/button-icon-text';
import ButtonSingle from '../../../components/button-single';
import {Poppins} from '../../utils/fonts';
import {useNavigateToScreen} from '../../helper/hooks';
import {useDetailProductFunctions} from './useDetailProductFunctions';
import {useEffect} from 'react';

const DetailProduct = (props: any) => {
  const {navigation} = props;
  const route = useRoute();
  const {params} = route;
  const typedParams = params as {id: number};
  const {height} = useWindowDimensions();
  const styles = useStyles(height);
  const {navigateToScreen} = useNavigateToScreen();
  const {
    getProductDetail,
    addToCart,
    functions: {getServiceProductDetail, handleAddCart},
  } = useDetailProductFunctions();

  const {loading, data, message} = getProductDetail;

  useEffect(() => {
    if (typedParams?.id) {
      getServiceProductDetail(typedParams?.id);
    }
  }, [typedParams?.id]);

  const onSubmit = () => {
    let payload = {} as any;
    payload.title = data?.title;
    payload.description = data?.description;
    payload.price = data?.price;
    payload.id = data?.id;
    payload.image = data?.images[0];
    handleAddCart(payload);
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data?.images?.[0] ? (
          <Image
            source={{uri: data?.images?.[0]}}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <Image source={ImageFour} style={styles.image} resizeMode="cover" />
        )}
        <View style={styles.wrapperNavTransparant}>
          <ButtonIcon
            icon={<IconArrowLeft width={20} height={20} />}
            onPress={() => navigateToScreen('back')}
          />

          <View style={styles.doubleButton}>
            <ButtonIcon icon={<IconLove width={20} height={20} />} />
            <Gap width={5} />
            <ButtonIcon icon={<IconUpload width={20} height={20} />} />
          </View>
        </View>
        <View style={styles.wrapperInformation}>
          <View style={styles.productInformation}>
            <Text style={styles.nameProduct}>{data?.title}</Text>
            <ButtonIconText
              label={'On sale'}
              icon={<IconPercent width={20} height={20} />}
            />
          </View>
          <Gap height={10} />
          <View style={styles.reviewSection}>
            <ButtonIconText
              icon={<IconStar width={20} height={20} />}
              label={data?.rating}
              styleContainer={styles.badgeRating}
              textStyle={styles.textStyle}
            />
            <Gap width={5} />
            <ButtonIconText
              icon={<IconDeliver width={20} height={20} />}
              styleContainer={styles.badgeRating}
              textStyle={styles.textStyle}
              label={data?.stock}
            />
            <Gap width={5} />
            <Text style={styles.textReviews}>
              {data?.reviews?.length} reviews
            </Text>
          </View>
          <Gap height={10} />
          <Text style={styles.desc}>{data?.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        {/* section price */}
        <View style={{flex: 1}}>
          <Text style={styles.strikeTroughPrice}>
            ${(data?.price || 0) + 2}
          </Text>
          <Text style={styles.price}>${data?.price || 0}</Text>
        </View>
        <View style={{flex: 2}}>
          <ButtonSingle
            title="Add to Cart"
            isLoading={addToCart?.loading === 'pending'}
            onPress={onSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default DetailProduct;

const useStyles = (height: any) => {
  const {colors} = useTheme();
  return StyleSheet.create({
    safearea: {
      flex: 1,
      backgroundColor: colors.container,
    },
    image: {
      width: '100%',
      height: height / 2 - 10,
    },
    doubleButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    wrapperNavTransparant: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      position: 'absolute',
      width: '100%',
      top: 0,
    },
    wrapperInformation: {
      backgroundColor: colors.container,
      width: '100%',
      top: -20,
      paddingHorizontal: 20,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    productInformation: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    nameProduct: {
      fontSize: 18,
      fontWeight: '500',
      color: colors.text,
    },
    reviewSection: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    badgeRating: {
      backgroundColor: colors.container,
      borderColor: colors.border,
      borderWidth: 1,
      paddingVertical: 4,
      paddingHorizontal: 7,
      borderRadius: 18,
    },
    textStyle: {
      color: colors.text,
      fontFamily: Poppins.extraBold,
    },
    textReviews: {
      fontSize: 11,
      color: colors.textInactive,
      fontFamily: Poppins.regular,
    },
    desc: {
      fontSize: 13,
      color: colors.text,
      lineHeight: 20,
      fontFamily: Poppins.medium,
    },
    styleContainer: {
      borderColor: colors.text,
      borderWidth: 1,
      padding: 6,
      borderRadius: 8,
      marginRight: 8,
    },
    styleContainerActive: {
      borderWidth: 0,
      backgroundColor: colors.textActive,
      color: colors.container,
    },
    footer: {
      backgroundColor: colors.container,
      borderTopColor: colors.border,
      borderTopWidth: 1,
      padding: 15,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    strikeTroughPrice: {
      fontFamily: Poppins.semiBold,
      fontSize: 15,
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
      color: colors.containerLine,
    },
    price: {
      fontFamily: Poppins.extraBold,
      fontSize: 15,
      color: colors.text,
    },
  });
};
