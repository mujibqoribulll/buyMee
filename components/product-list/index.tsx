import {
  FlatList,
  GestureResponderEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CardProduct from '../card-product';
import {useNavigateToScreen} from '../../src/helper/hooks';

export type InitialProductType = {
  id?: number;
  name: string;
  price: number;
  rating: number;
  image: string;
};

type ProductTypes = {
  data: InitialProductType[];
};

const ProductList = (props: ProductTypes) => {
  const {data} = props;
  const styles = useStyles();

  const {navigateToScreen} = useNavigateToScreen();
  return (
    <View style={{}}>
      <FlatList
        nestedScrollEnabled={true}
        data={data}
        scrollEnabled={false}
        keyExtractor={(item, index) => index.toFixed()}
        renderItem={({item, index}) => (
          <CardProduct
            data={item}
            key={index}
            onPress={() => navigateToScreen('detail-product', item)}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.container}
        columnWrapperStyle={{margin: 7}}
      />
    </View>
  );
};

export default ProductList;

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
  });
};
