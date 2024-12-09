import {useTheme} from '@react-navigation/native';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

type BadgeTypes = {
  title: string;
  action?: (event: GestureResponderEvent) => void;
  textStyles?: StyleProp<TextStyle>;
  textStylesActive?: StyleProp<TextStyle>;
};

const BadgeVariant = (props: BadgeTypes): JSX.Element => {
  const {title, textStyles, textStylesActive} = props;
  const styles = useStyles();
  return (
    <TouchableOpacity>
      <Text style={[textStyles, textStylesActive, styles.textTitle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default BadgeVariant;

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
