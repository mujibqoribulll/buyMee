import {useTheme} from '@react-navigation/native';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Gap from '../gap';

type Buttontypes = {
  label?: string;
  icon?: React.ReactNode;
  styleContainer?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const ButtonIconText = (props: Buttontypes): JSX.Element => {
  const {icon, label, styleContainer, textStyle} = props;
  const styles = useStyles();
  return (
    <View style={[styles.container, styleContainer]}>
      {icon}
      <Gap width={5} />
      <Text style={[styles.label, textStyle]}>{label}</Text>
    </View>
  );
};

export default ButtonIconText;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      backgroundColor: colors.danger,
      borderRadius: 10,
      paddingVertical: 4,
      paddingRight: 6,
    },
    label: {
      fontSize: 12,
      fontWeight: '500',
      color: colors.container,
    },
  });
};
