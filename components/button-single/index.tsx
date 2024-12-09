import {useTheme} from '@react-navigation/native';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { PlayfairDisplay } from '../../src/utils/fonts';

type ButtonType = {
  title: string;
  onPress: () => void;
  isLoading: boolean;
};

const ButtonSingle = (props: ButtonType): JSX.Element => {
  const {title, onPress, isLoading} = props;

  const styles = useStyles();
  return (
    <TouchableWithoutFeedback style={{flex: 1}} onPress={onPress}>
      <View style={styles.container}>
        {isLoading && (
          <ActivityIndicator size="small" color="#fff" style={styles.loading} />
        )}
        <Text style={styles.title}>{!isLoading ? title : 'Authenticate'}</Text>
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
      fontFamily: PlayfairDisplay.semiBold,
    },
    loading: {
      marginRight: 10,
    },
  });
};
