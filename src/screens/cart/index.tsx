import {useTheme} from '@react-navigation/native';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Nav from '../../../components/nav';
import {IconArrowLeft, IconMoreVertical} from '../../assets';
import {useNavigateToScreen} from '../../helper/hooks';
import CartList from '../../../components/cart-list';
import {useCartFunctions} from './useCartFunctions';
import Gap from '../../../components/gap';
import ButtonSingle from '../../../components/button-single';

const Cart = () => {
  const styles = useStyles();
  const {navigateToScreen} = useNavigateToScreen();
  const {cartProducts} = useCartFunctions();
  return (
    <SafeAreaView style={styles.safearea}>
      <Nav
        leftIcon={<IconArrowLeft width={20} height={20} />}
        leftPressIcon={() => navigateToScreen('back')}
        rightIcon={<IconMoreVertical width={20} height={20} />}
        midLabel="My Cart"
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Gap height={10} />
        <CartList data={cartProducts} />
      </ScrollView>
      <View style={styles.footer}>
        {/* section price */}
        <ButtonSingle
          title="Checkout $480.00"
          // isLoading={login.loading === 'pending'}
          // onPress={onSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default Cart;
const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    safearea: {
      flex: 1,
      backgroundColor: colors.container,
    },
    container: {
      paddingHorizontal: 20,
    },
    footer: {
      backgroundColor: colors.container,
      padding: 20,
      borderTopColor: colors.border,
      borderTopWidth: 1,
    }
  });
};
