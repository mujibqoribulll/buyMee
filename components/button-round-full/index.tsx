import {useTheme} from '@react-navigation/native';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

type ButtonTextType = {
  title: string;
  action?: (event: GestureResponderEvent) => void;
  textStyles?: StyleProp<TextStyle>;
  textStylesActive?: StyleProp<TextStyle>;
  containerStyleActive?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

const ButtonRoundFull = (props: ButtonTextType): JSX.Element => {
  const {title, textStyles, textStylesActive, onPress, containerStyleActive} =
    props;
  const styles = useStyles();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, containerStyleActive]}>
        <Text style={[textStyles, styles.textTitle, textStylesActive]}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ButtonRoundFull;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors.border,
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 50,
      backgroundColor: colors.card,
    },
    textTitle: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
    },
  });
};
