import {
  FlatList,
  GestureResponderEvent,
  RefreshControl,
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
  rating?: number;
  image: string;
};

type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

type Review = {
  rating: number;
  comment: string;
  date: string; // ISO date string format
  reviewerName: string;
  reviewerEmail: string;
};

type Meta = {
  createdAt: string; // ISO date string format
  updatedAt: string; // ISO date string format
  barcode: string;
  qrCode: string; // URL to QR code image
};

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[]; // Array of image URLs
  thumbnail: string; // Thumbnail image URL
};

export type ProductTypes = {
  products: Product;
};

type DataTypes = {
  data: ProductTypes;
};

const ProductList = (props: DataTypes) => {
  const {data, handleEndReach} = props;
  const styles = useStyles();

  const {navigateToScreen} = useNavigateToScreen();
  return (
    <View style={{flex: 1}}>
      <FlatList
        nestedScrollEnabled={true}
        data={data?.data?.products}
        scrollEnabled={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <CardProduct
            data={item}
            key={index}
            onPress={() => navigateToScreen('detail-product', item)}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.container}
        onEndReachedThreshold={2}
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
