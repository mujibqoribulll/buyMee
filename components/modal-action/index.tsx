import {useTheme} from '@react-navigation/native';
import {FC} from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {IcClose} from '../../src/assets';
import {Poppins} from '../../src/utils/fonts';
import ButtonSingle from '../button-single';

interface ObjectTypes {
  label: string;
  value: string;
}

interface SortTypes {
  price: string;
  order: string;
}

export interface ModalSelectCustomProps {
  navigation?: any;
  isVisisble?: boolean;
  onClose?(): void;
  isLoading?: string;
  onPress?: () => void
}

const ModalAction: FC<ModalSelectCustomProps> = props => {
  const {isVisisble, onClose, isLoading, onPress} = props;

  const {height} = useWindowDimensions();

  const styles = useStyles();

  return (
    <ReactNativeModal
      isVisible={isVisisble}
      onBackdropPress={onClose}
      deviceHeight={height}
      style={styles.styleModal}
      swipeDirection={'down'}
      swipeThreshold={20}
      propagateSwipe={true}
      useNativeDriver
      useNativeDriverForBackdrop
      onBackButtonPress={onClose}>
      <View style={styles.content}>
        <View style={styles.contentText}>
          <Text style={styles.title}>
            Are you sure you want to remove this product?
          </Text>
          <Text style={styles.description}>
            Deleting this product will permanently remove it from your cart.
            You’ll need to add it again if you change your mind later.
          </Text>
        </View>
        <View style={styles.contentActions}>
          <ButtonSingle
            title="Cancel"
            styleContainer={styles.containerButtonCancel}
            styleTitle={styles.styleTitleCancel}
            onPress={onClose}
          />
          <ButtonSingle
            title="Yes"
            styleContainer={styles.containerButtonYes}
            onPress={onPress}
          />
        </View>
      </View>
    </ReactNativeModal>
  );
};
export default ModalAction;

const useStyles = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    content: {
      backgroundColor: colors.container,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingVertical: 5,
      paddingHorizontal: 10,
      width: '100%',
    },
    action: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
    },
    styleModal: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      margin: 0,
    },
    containerStyleActive: {
      backgroundColor: colors.textActive,
    },
    textStylesActive: {
      color: colors.card,
    },
    containerButtonCancel: {
      backgroundColor: colors.card,
      borderColor: colors.text,
      borderWidth: 1,
      flex: 1,
    },
    containerButtonYes: {
      flex: 1,
    },
    styleTitleCancel: {
      color: colors.text,
    },
    contentActions: {
      flexDirection: 'row',
      gap: 10,
    },
    title: {
      fontSize: 16,
      fontFamily: Poppins.semiBold,
      color: colors.text,
      textAlign: 'center',
    },
    description: {
      fontSize: 14,
      fontFamily: Poppins.regular,
      color: colors.containerLine,
      textAlign: 'center',
    },
    contentText: {
      paddingHorizontal: 5,
      paddingVertical: 17,
    },
  });
};
