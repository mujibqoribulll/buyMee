import {useTheme} from '@react-navigation/native';
import {useState} from 'react';
import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';

type InputTextSearchTypes = {
  placeholder: string;
  icon: React.ReactNode;
  value: string;
};

const InputTextSearch = (props: InputTextSearchTypes): JSX.Element => {
  const {placeholder, icon, value} = props;
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
        />
        {icon}
      </View>
    </View>
  );
};

export default InputTextSearch;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      marginHorizontal: 10,
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
      width: '95%',
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
