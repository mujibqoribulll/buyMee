import {GestureResponderEvent, StyleSheet, Text, View} from 'react-native';
import ButtonIcon from '../button-icon';
import {useTheme} from '@react-navigation/native';
import Gap from '../gap';
import { Poppins } from '../../src/utils/fonts';

type NavType = {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftPressIcon?: (event: GestureResponderEvent) => void; // Fungsi untuk menangani klik ikon kiri
  rightPressIcon?: (event: GestureResponderEvent) => void; // Fungsi untuk menangani klik ikon kanan
  rightPressIconMore?: (event: GestureResponderEvent) => void; // Fungsi untuk menangani klik ikon kanan
  leftLabel?: string;
  midLabel?: string;
  doubleButtonRight?: boolean;
  rightIconMore?: React.ReactNode;
  hasCount?:boolean;
  count?: number
};

const Nav = (props: NavType) => {
  const {
    leftIcon,
    rightIcon,
    leftPressIcon,
    rightPressIcon,
    rightPressIconMore,
    leftLabel,
    midLabel,
    doubleButtonRight = false,
    rightIconMore,
    hasCount = false,
    count,
  } = props;
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {leftLabel ? (
        <Text style={styles.label}>{leftLabel}</Text>
      ) : (
        <ButtonIcon icon={leftIcon} onPress={leftPressIcon} />
      )}

      {midLabel ? <Text style={styles.label}>{midLabel}</Text> : null}
      {doubleButtonRight ? (
        <View style={styles.doubleButton}>
          <ButtonIcon icon={rightIconMore} onPress={rightPressIconMore} />
          <Gap width={5} />
          <ButtonIcon icon={rightIcon} onPress={rightPressIcon} />
        </View>
      ) : (
        <ButtonIcon icon={rightIcon} onPress={rightPressIcon} hasCount={hasCount} count={count}  />
      )}
    </View>
  );
};

export default Nav;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    label: {
      fontSize: 16,
      fontFamily: Poppins.bold,
      color: colors.text,
    },
    doubleButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
