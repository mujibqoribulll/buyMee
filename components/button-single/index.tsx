import {useTheme} from '@react-navigation/native';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {Poppins} from '../../src/utils/fonts';

type ButtonType = {
  title: string;
  onPress: () => void;
  isLoading: boolean | any;
  disable?: boolean;
  styleContainer?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
};

const ButtonSingle = (props: ButtonType): JSX.Element => {
  const {title, onPress, isLoading, styleContainer, styleTitle, disable} =
    props;

  const styles = useStyles();
  return (
    <TouchableWithoutFeedback
      style={{flex: 1}}
      onPress={onPress}
      disabled={disable}>
      <View style={[styles.container, styleContainer]}>
        {isLoading && (
          <ActivityIndicator size="small" color="#fff" style={styles.loading} />
        )}
        <Text style={[styles.title, styleTitle]}>
          {!isLoading ? title : 'Loading...'}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ButtonSingle;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      backgroundColor: colors.textActive,
      height: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    title: {
      fontSize: 17,
      fontWeight: '400',
      color: colors.card,
      fontFamily: Poppins.semiBold,
    },
    loading: {
      marginRight: 10,
    },
  });
};
