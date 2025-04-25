import {useTheme} from '@react-navigation/native';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

type ButtonIcon = {
  icon?: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  hasCount?: boolean;
  styleIcon?: StyleProp<ViewStyle>;
  count?: number
};

const ButtonIcon = (props: ButtonIcon): JSX.Element => {
  const styles = useStyles();
  const {icon, onPress, hasCount = false, styleIcon, count} = props;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        <View style={styles.container}>
          <View style={[styles.iconLabel, styleIcon]}>{icon}</View>
        </View>
        {hasCount && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ButtonIcon;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      position: 'relative',
      display: 'flex',
    },
    iconLabel: {
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 50,
      padding: 7,
      backgroundColor: colors.container,
      overflow: 'hidden',
    },
    badge: {
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.textActive,
      paddingHorizontal: 5,
      borderRadius: 10,
      top: -3,
      right: -3,
    },
    badgeText: {
      color: colors.container,
      fontSize: 12,
    },
  });
};
