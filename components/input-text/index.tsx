import {useTheme} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {IcEyes, IcEyesOff} from '../../src/assets';
import { Poppins } from '../../src/utils/fonts';

type InputProps = {
  label?: string;
  placeholder: string;
  onBlur?: any;
  onFocus?: any;
  onChangeText: (value: string) => void;
  value?: string;
  helper?: string;
  type?: string;
};
const InputText = (props: InputProps): JSX.Element => {
  const {
    label,
    placeholder,
    onBlur,
    onFocus,
    onChangeText,
    value,
    helper,
    type,
  } = props;
  const {colors} = useTheme();
  const styles = useStyles(colors);

  const [isFocused, setIsFocused] = useState(false); // Untuk blur/focus efek
  const [hint, setHint] = useState(helper);
  const [isRender, setIsRender] = useState(false);
  const [secure, setSecure] = useState(false);

  useEffect(() => {
    setIsRender(true);
  }, []);

  useEffect(() => {
    if (type === 'password') {
      setSecure(true);
    }
  }, [type]);

  useEffect(() => {
    setHint(helper);
  }, [isRender, helper]);

  return (
    <>
      <View style={{}}>
        <Text style={styles.label}>{label ? label : null}</Text>
        <View
          style={[
            styles.wrapperText,
            isFocused && styles.inputTextFocused,
            hint ? styles.formErr : null,
          ]}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={colors.textPlaceholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={value => onChangeText(value)}
            value={value}
            style={styles.textInput}
            defaultValue={value}
            secureTextEntry={secure}
          />
          {type === 'password' && (
            <TouchableWithoutFeedback onPress={() => setSecure(!secure)}>
              <View style={styles.icon}>
                {!secure ? (
                  <IcEyesOff width={15} height={15} />
                ) : (
                  <IcEyes width={15} height={15} />
                )}
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>

      {hint ? (
        <>
          <View style={{marginBottom: 6}} />
          <View style={{flexDirection: 'row'}}>
            {/* <IcErrorForm marginTop={2}/> */}
            <Text style={styles.helper}>{` ${hint}`}</Text>
          </View>
        </>
      ) : null}
    </>
  );
};

export default InputText;

const useStyles = (colors: any) => {
  return StyleSheet.create({
    border: {},
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.card,
      marginVertical: 10,
      fontFamily: Poppins.semiBold,
    },
    textInput: {
      fontSize: 14,
      fontWeight: '400',
      fontFamily: Poppins.regular,
      color: colors.textPlaceholder,
      width: '90%',
      ...Platform.select({
        android: {
          paddingVertical: 8,
        },
        ios: {
          paddingVertical: 12,
        },
      }),
    },
    wrapperText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderColor: colors.containerLine,
      borderWidth: 1,
      paddingHorizontal: 13,
      borderRadius: 5,
    },
    inputTextFocused: {
      shadowColor: colors.container,
      borderColor: colors.container,
    },
    helper: {
      fontSize: 10,
      color: colors.danger,
      fontFamily: Poppins.semiBold,
    },
    formErr: {
      borderColor: colors.danger,
    },
    icon: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
