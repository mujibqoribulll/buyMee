import {
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

type CategoryTypes = {
  id: number;
  name: string;
};

type CategoryListType = {
  title: string;
  action: string;
  data: CategoryTypes[];
};

const CategoryList = (props: CategoryListType) => {
  const {data, action, title} = props;

  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.wrapperCategory}>
        <Text style={styles.textTitle}>{title}</Text>
        <ButtonText title={action} textStyles={styles.textActionStyle} />
      </View>
      <Gap height={10} />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        nestedScrollEnabled={true}>
        {data.map((item, index) => (
          <TouchableWithoutFeedback key={index}>
            <View style={[styles.card, index === 0 && styles.cardActive]}>
              <Text style={[styles.text, index === 0 && styles.textActive]}>
                {item?.name}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryList;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      marginHorizontal: 10,
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
    },
    textActionStyle: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.textActive,
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
  });
};
