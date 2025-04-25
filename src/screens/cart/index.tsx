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
import {useAppSelector} from '../../store/hooks';
import {shallowEqual} from 'react-redux';
import ModalAction from '../../../components/modal-action';

const Cart = () => {
  const styles = useStyles();
  const {navigateToScreen} = useNavigateToScreen();
  const {
    cart,
    totalPrice,
    isDeletedProduct,
    function: {
      handleDelete,
      handleCloseDeleteModal,
      onPressDelete,
      handleIncrease,
      handleDecrease,
      handleCheckBox,
    },
  } = useCartFunctions();

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
        <CartList
          data={cart}
          handleDelete={data => handleDelete(data)}
          handleIncrease={data => handleIncrease(data)}
          handleDecrease={data => handleDecrease(data)}
          handleCheckBox={handleCheckBox}
        />
      </ScrollView>

      {/* section price */}
      {cart?.length > 0 && (
        <View style={styles.footer}>
          <ButtonSingle
            title={`$ ${totalPrice} Checkout` }
            // isLoading={login.loading === 'pending'}
            // onPress={onSubmit}
          />
        </View>
      )}
      <ModalAction
        isVisisble={isDeletedProduct}
        onClose={handleCloseDeleteModal}
        onPress={onPressDelete}
      />
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
    },
  });
};
