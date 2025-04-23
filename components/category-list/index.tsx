import {
  ActivityIndicator,
  FlatList,
  GestureResponderEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ButtonText from '../button-text';
import {useTheme} from '@react-navigation/native';
import Gap from '../gap';
import ButtonRound from '../button-round';

type CategoryTypes = {
  id: number;
  name: string;
};

type CategoryListType = {
  title: string;
  action: string;
  data: any;
  handleFilterByCategory?: (type: string, value: string) => void;
  filterByCategory?: string;
};

const CategoryList = (props: CategoryListType) => {
  const {data, action, title, handleFilterByCategory, filterByCategory} = props;

  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.wrapperCategory}>
        <Text style={styles.textTitle}>{title}</Text>
        <ButtonText title={action} textStyles={styles.textActionStyle} />
      </View>
      <Gap height={10} />
      {data?.loading !== 'pending' ? (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          nestedScrollEnabled={true}>
          <View style={styles.contentCategory}>
            {data?.data?.map?.((title, index) => (
              <ButtonRound
                title={title}
                key={index}
                onPress={() => handleFilterByCategory?.('tab-home', title)}
                styleActive={
                  filterByCategory === title ? styles.cardActive : null
                }
                textStylesActive={
                  filterByCategory === title ? styles.textActionStyle : null
                }
              />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size={'small'} color={'#0092AC'} />
        </View>
      )}
    </View>
  );
};

export default CategoryList;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      marginHorizontal: 10,
      flex: 1,
    },
    wrapperCategory: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
      textTransform: 'capitalize',
    },
    textActionStyle: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.card,
    },
    card: {
      margin: 5,
      padding: 6,
      borderColor: colors.text,
      borderWidth: 1,
      borderRadius: 10,
    },
    cardActive: {
      backgroundColor: colors.textActive,
      borderWidth: 0,
    },
    text: {
      fontSize: 12,
      color: colors.text,
      fontWeight: '500',
    },
    textActive: {
      fontSize: 12,
      color: colors.container,
      fontWeight: '500',
    },
    loading: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentCategory: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
  });
};
