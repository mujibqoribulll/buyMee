import {FlatList, View} from 'react-native';
import {InitialProductType} from '../product-list';
import CartProduct from '../cart-product';
import {useTheme} from '@react-navigation/native';

type CartTypes = {
  data: InitialProductType[];
};

const CartList = (props: CartTypes) => {
  const {data} = props;
  const {colors} = useTheme();
  return (
    <FlatList
      data={data}
      scrollEnabled={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) => <CartProduct data={item} key={index} />}
      contentContainerStyle={{marginBottom: 20}}
      ItemSeparatorComponent={() => (
        <View
          style={{
            borderColor: colors.border,
            borderWidth: 0.7,
            marginVertical: 10,
          }}
        />
      )}
    />
  );
};

export default CartList;
