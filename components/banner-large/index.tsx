import {useTheme} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

type InitialBannerTypes = {
  name: string;
  image: number;
  desc: string;
};

type BannerTypes = {
  data: InitialBannerTypes[];
};
const BannerLarge = (props: BannerTypes): JSX.Element => {
  const {data} = props;
  const {width} = useWindowDimensions();
  const styles = useStyles(width);

  const [currentIndex, setCurrentIndex] = useState(0); // Menyimpan indeks saat ini
  const flatListRef = useRef<FlatList>(null); // Referensi ke FlatList

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex + 1 < data.length ? prevIndex + 1 : 0;
        flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
        return nextIndex;
      });
    }, 7000); // Interval 3 detik
    return () => clearInterval(interval); // Membersihkan interval saat komponen di-unmount
  }, [data.length]);

  const renderItem = ({
    item,
    index,
  }: {
    item: InitialBannerTypes;
    index: number;
  }) => {
    return (
      <View style={styles.imageContainer} key={index}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled={true}
        ref={flatListRef}
        data={data}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.name}
        renderItem={renderItem}
      />
    </View>
  );
};

export default BannerLarge;

const useStyles = (width: number) => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      width: width / 1,
      paddingHorizontal: 10,
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 10,
      paddingHorizontal: 10,
    },
  });
};
