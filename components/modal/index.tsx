import {useTheme} from '@react-navigation/native';
import {FC} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {IcClose} from '../../src/assets';
import ButtonIcon from '../button-icon';

export interface ModalSelectCustomerProps {
  navigation?: any;
  value?: any;
  isVisisble?: boolean;
  onVisibleChange?(visible: boolean): void;
  onClose?(): void;
  onSubmit?(item: any): void;
}

const Modal: FC<ModalSelectCustomerProps> = props => {
  const {navigation, isVisisble, onClose, onSubmit, value, onVisibleChange} =
    props;

  const {height} = useWindowDimensions();

  const styles = useStyles();
  return (
    <ReactNativeModal
      isVisible={isVisisble}
      onBackdropPress={onClose}
      deviceHeight={height}
      style={{justifyContent: 'flex-end', alignItems: 'center', margin: 0}}
      swipeDirection={'down'}
      swipeThreshold={20}
      propagateSwipe={true}
      useNativeDriver
      hasBackdrop={false}
      useNativeDriverForBackdrop
      onBackButtonPress={onClose}>
      <View style={styles.content}>
        <View style={styles.action}>
          <ButtonIcon
            hasCount={false}
            onPress={onClose}
            styleIcon={styles.styleIcon}
            icon={<IcClose height={15} width={15} />}
          />
        </View>
        <Text style={{}}>
          hallo Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
          illum, exercitationem voluptates iste quae eius voluptas quos ad optio
          ut.
        </Text>
      </View>
    </ReactNativeModal>
  );
};
export default Modal;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    content: {
      backgroundColor: colors.container,
      borderTopEndRadius: 20,
      padding: 10,
    },
    action: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    styleIcon: {
      borderWidth: 0,
      borderRadius: 0,
      padding: 0,
    },
  });
};
