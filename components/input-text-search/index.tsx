import {useTheme} from '@react-navigation/native';
import {useState} from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {IconMenu} from '../../src/assets';
import ButtonIcon from '../button-icon';

type InputTextSearchTypes = {
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (text: string) => void;
  isLoading: boolean;
  onPress: (evnt: GestureResponderEvent) => void;
};

const InputTextSearch = (props: InputTextSearchTypes): JSX.Element => {
  const {placeholder, icon, value, onChange, isLoading, onPress} = props;
  const styles = useStyles();
  const [isFocused, setIsFocused] = useState(false); // Untuk blur/focus efek

  return (
    <View style={styles.container}>
      <View style={[styles.wrapperText, isFocused && styles.inputTextFocused]}>
        <TextInput
          value={value}
          defaultValue={value}
          placeholder={placeholder}
          style={styles.text}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={onChange}
        />
        {isLoading ? (
          <ActivityIndicator size="small" color={'#0092AC'} />
        ) : (
          icon
        )}
      </View>

      <ButtonIcon
        hasCount={false}
        icon={<IconMenu width={20} height={20} />}
        styleIcon={{borderWidth: 0}}
        onPress={onPress}
      />
    </View>
  );
};

export default InputTextSearch;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      marginHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // backgroundColor: 'red'
    },
    wrapperText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'center',
      borderColor: colors.containerLine,
      shadowColor: colors.containerLine,
      borderWidth: 1,
      paddingHorizontal: 13,
      borderRadius: 5,
    },
    text: {
      width: '85%',
      fontSize: 14,
      fontWeight: '400',
      color: colors.text,
      ...Platform.select({
        android: {
          paddingVertical: 8,
        },
        ios: {
          paddingVertical: 12,
        },
      }),
    },
    inputTextFocused: {
      shadowColor: colors.textActive,
      borderColor: colors.textActive,
    },
  });
};
