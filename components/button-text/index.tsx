import {useTheme} from '@react-navigation/native';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

type ButtonTextType = {
  title: string;
  action?: (event: GestureResponderEvent) => void;
  textStyles?: StyleProp<TextStyle>;
  textStylesActive?: StyleProp<TextStyle>
  onPress?: () => void
};

const ButtonText = (props: ButtonTextType): JSX.Element => {
  const {title, textStyles, textStylesActive, onPress} = props;
  const styles = useStyles()
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[textStyles, textStylesActive, styles.textTitle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonText;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    textTitle: {
      fontSize: 13,
      fontWeight: '500',
      color: colors.text,
    },
  });
};
