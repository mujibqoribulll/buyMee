import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Nav from '../../../components/nav';
import {NavigationProp, useTheme} from '@react-navigation/native';
import {IconCart, IconSearch} from '../../assets';
import BannerLarge from '../../../components/banner-large';
import Gap from '../../../components/gap';
import InputTextSearch from '../../../components/input-text-search';
import CategoryList from '../../../components/category-list';
import ProductList from '../../../components/product-list';
import {useHomeFunctions} from './useHomeFunctions';
import {useNavigateToScreen} from '../../helper/hooks';
import {useEffect, useState} from 'react';
import CardProduct from '../../../components/card-product';
import Modal from '../../../components/modal';

type HomePageTypes = {
  navigation: NavigationProp<any>;
};

const HomePage = (props: HomePageTypes) => {
  const styles = useStyles();
  const {navigateToScreen} = useNavigateToScreen();

  const {
    dummyBanners,
    dummyCategory,
    refreshing,
    product,
    form,
    modalSort,
    function: {
      onRefresh,
      handleGetAllProduct,
      handleEndReach,
      setForm,
      setModalSort,
    },
  } = useHomeFunctions();

  useEffect(() => {
    handleGetAllProduct('reset');
  }, []);

  return (
    <SafeAreaView style={styles.safearea}>
      <FlatList
        nestedScrollEnabled={true}
        data={product?.data?.products}
        scrollEnabled={true}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <View style={{}}>
            <Nav
              leftLabel="Discovery"
              rightIcon={<IconCart width={20} height={20} />}
              hasCount={true}
              rightPressIcon={() => navigateToScreen('cart')}
            />
            <Gap height={10} />
            <InputTextSearch
              placeholder="Search"
              icon={<IconSearch width={15} height={15} />}
              value={form.search.value}
              onChange={value => setForm('search', value)}
              isLoading={
                product.loading === 'pending' && form.search.value.length > 0
              }
              onPress={() => setModalSort((prevState) => !prevState)}
            />
            <Gap height={10} />
            <BannerLarge data={dummyBanners} />
            <Gap height={10} />
            <View style={{height: 70}}>
              <CategoryList
                data={dummyCategory}
                title="Categories"
                action="See all"
              />
            </View>
            <Gap height={10} />
          </View>
        }
        renderItem={({item, index}) => (
          <CardProduct
            data={item}
            key={index}
            onPress={() => navigateToScreen('detail-product', item)}
          />
        )}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.styleContainer}
        onEndReachedThreshold={0.5}
        onEndReached={handleEndReach}
        columnWrapperStyle={{margin: 7}}
        showsVerticalScrollIndicator={false}
      />
      <Modal isVisisble={modalSort} onClose={() => setModalSort(!modalSort)} />
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
    styleContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
  });
};
