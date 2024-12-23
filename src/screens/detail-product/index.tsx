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
import {useTheme} from '@react-navigation/native';
import {ImageFour} from '../../assets';
import ButtonIcon from '../../../components/button-icon';
import Gap from '../../../components/gap';
import ButtonIconText from '../../../components/button-icon-text';
import ButtonSingle from '../../../components/button-single';
import {PlayfairDisplay} from '../../utils/fonts';
import BadgeVariant from '../../../components/badge-variant';
import {useNavigateToScreen} from '../../helper/hooks';

const DetailProduct = (props: any) => {
  const {height} = useWindowDimensions();
  const styles = useStyles(height);
  const {navigateToScreen} = useNavigateToScreen();

  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={ImageFour} style={styles.image} resizeMode="cover" />
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
            <Text style={styles.nameProduct}>Iphone 16 Pro</Text>
            <ButtonIconText
              label={'On sale'}
              icon={<IconPercent width={20} height={20} />}
            />
          </View>
          <Gap height={10} />
          <View style={styles.reviewSection}>
            <ButtonIconText
              icon={<IconStar width={20} height={20} />}
              label="9.8"
              styleContainer={styles.badgeRating}
              textStyle={styles.textStyle}
            />
            <Gap width={5} />
            <ButtonIconText
              icon={<IconDeliver width={20} height={20} />}
              styleContainer={styles.badgeRating}
              textStyle={styles.textStyle}
              label="9.8"
            />
            <Gap width={5} />
            <Text style={styles.textReviews}>117 reviews</Text>
          </View>
          <Gap height={10} />
          <Text style={styles.desc}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            fugit nam tenetur non nobis deleniti, ducimus molestias! Corrupti,
            est blanditiis qui eius expedita ullam porro laborum cum, veniam
            voluptate aliquam?
          </Text>

          <Gap height={10} />
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            {[1, 2, 3].map((item, index) => (
              <BadgeVariant
                title={
                  index === 0 ? '1 GB' : index === 1 ? '854 GB' : '1000 GB'
                }
                textStyles={styles.styleContainer}
                textStylesActive={index === 0 && styles.styleContainerActive}
                key={index}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        {/* section price */}
        <View style={{flex: 1}}>
          <Text style={styles.strikeTroughPrice}>$650.00</Text>
          <Text style={styles.price}>$570.00</Text>
        </View>
        <View style={{flex: 2}}>
          <ButtonSingle
            title="Add to Cart"
            // isLoading={login.loading === 'pending'}
            // onPress={onSubmit}
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
      fontFamily: PlayfairDisplay.extraBold,
    },
    textReviews: {
      fontSize: 11,
      color: colors.textInactive,
      fontFamily: PlayfairDisplay.regular,
    },
    desc: {
      fontSize: 13,
      color: colors.text,
      lineHeight: 20,
      fontFamily: PlayfairDisplay.medium,
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
      fontFamily: PlayfairDisplay.semiBold,
      fontSize: 15,
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
      color: colors.containerLine,
    },
    price: {
      fontFamily: PlayfairDisplay.extraBold,
      fontSize: 15,
      color: colors.text,
    },
  });
};
