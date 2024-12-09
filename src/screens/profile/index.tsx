import {useTheme} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {postLogout} from '../../slices/authThunk';
import {useAppDispatch} from '../../store/hooks';

const Profile = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(postLogout());
  };
  return (
    <SafeAreaView style={styles.safearea}>
      <TouchableWithoutFeedback onPress={handleLogout}>
        <View style={styles.button}>
          <Text style={styles.text}>Logout</Text>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Profile;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    safearea: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      backgroundColor: colors.textActive,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    text: {
      color: colors.container,
      fontSize: 15,
      fontWeight: '800',
    },
  });
};
