import {FlatList, StyleSheet, Text, View} from 'react-native';
import {InitialProductType} from '../product-list';
import CartProduct from '../cart-product';
import {useTheme} from '@react-navigation/native';
import {Poppins} from '../../src/utils/fonts';

type CartTypes = {
  data: InitialProductType[];
  handleDelete: (data: any) => void;
};

const CartList = (props: CartTypes) => {
  const styles = useStyles();
  const {data, handleDelete} = props;
  return (
    <FlatList
      data={data}
      scrollEnabled={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) => (
        <CartProduct
          data={item}
          key={index}
          handleDelete={data => handleDelete(data)}
        />
      )}
      contentContainerStyle={{marginBottom: 20}}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      ListEmptyComponent={
        <View style={styles.emptyCart}>
          <Text style={styles.message}> Your cart is currently empty.</Text>
        </View>
      }
    />
  );
};

export default CartList;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    itemSeparator: {
      borderColor: colors.border,
      borderWidth: 0.7,
      marginVertical: 10,
    },
    emptyCart: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    message: {
      color: colors.text,
      fontFamily: Poppins.regular,
      fontSize: 14,
    },
  });
};
