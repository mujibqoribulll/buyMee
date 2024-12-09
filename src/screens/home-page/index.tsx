import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Nav from '../../../components/nav';
import {useTheme} from '@react-navigation/native';
import {
  IconCart,
  IconSearch,
  ImageFour,
  ImageOne,
  ImageThree,
  ImageTwo,
} from '../../assets';
import BannerLarge from '../../../components/banner-large';
import Gap from '../../../components/gap';
import InputTextSearch from '../../../components/input-text-search';
import CategoryList from '../../../components/category-list';
import CardProduct from '../../../components/card-product';
import ProductList from '../../../components/product-list';
import {useHomeFunction} from './useHomeFunction';

const HomePage = () => {
  const styles = useStyles();

  const {
    dummyBanners,
    dummyProduct,
    dummyCategory,
    function: {},
  } = useHomeFunction();




  return (
    <SafeAreaView style={styles.safearea}>
      <Nav
        leftLabel="Discovery"
        rightIcon={<IconCart width={20} height={20} />}
        hasCount={true}
      />
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}>
        <Gap height={10} />
        <InputTextSearch
          placeholder="Search"
          icon={<IconSearch width={15} height={15} />}
          value="Iphone 16 Pro"
        />
        <Gap height={10} />
        <BannerLarge data={dummyBanners} />
        <Gap height={10} />
        <CategoryList
          data={dummyCategory}
          title="Categories"
          action="See all"
        />
        <Gap height={10} />
        <ProductList data={dummyProduct}  />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    safearea: {
      flex: 1,
      backgroundColor: colors.container,
    },
  });
};