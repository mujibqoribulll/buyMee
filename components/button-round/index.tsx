import {useTheme} from '@react-navigation/native';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

type ButtonTextType = {
  title: string;
  action?: (event: GestureResponderEvent) => void;
  textStylesActive?: StyleProp<TextStyle>;
  styleActive?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

const ButtonRound = (props: ButtonTextType) => {
  const {styleActive, title, textStylesActive, onPress} = props;
  const styles = useStyles();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.card, styleActive]}>
        <Text style={[styles.text, textStylesActive]}>{title?.replaceAll('-', ' ')}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ButtonRound;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    card: {
      padding: 6,
      borderColor: colors.text,
      borderWidth: 1,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      fontSize: 12,
      color: colors.text,
      fontWeight: '500',
      textTransform: 'capitalize',
    },
  });
};
