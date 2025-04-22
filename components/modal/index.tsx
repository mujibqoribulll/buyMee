import {useTheme} from '@react-navigation/native';
import {FC} from 'react';
import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {IcClose} from '../../src/assets';
import ButtonIcon from '../button-icon';
import {Poppins} from '../../src/utils/fonts';
import ButtonSingle from '../button-single';
import ButtonRound from '../button-round';

interface ObjectTypes {
  label: string;
  value: string;
}

interface SortTypes {
  price: string
  order: string
}

export interface ModalSelectCustomerProps {
  navigation?: any;
  value?: any;
  isVisisble?: boolean;
  onVisibleChange?(visible: boolean): void;
  onClose?(): void;
  onSubmit?(item: any): void;
  data?: ObjectTypes[];
  onSortFilter?: (type: string, value: string) => void;
  onSubmitFilter?: () => void;
  IsDisableFilter?: boolean;
  isLoading?: string;
  sort?: SortTypes
}

const Modal: FC<ModalSelectCustomerProps> = props => {
  const {
    isVisisble,
    onClose,
    onSubmit,
    value,
    onVisibleChange,
    data,
    onSortFilter,
    onSubmitFilter,
    IsDisableFilter,
    isLoading,
    sort,
  } = props;

  const {height} = useWindowDimensions();

  const styles = useStyles();

  const handlePress = (type: string, value: string) => {
    onSortFilter?.(type, value);
  };
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
        <View style={styles.action}>
          <Text style={styles.title}>Filter</Text>
          <ButtonIcon
            hasCount={false}
            onPress={onClose}
            styleIcon={styles.styleIcon}
            icon={<IcClose height={15} width={15} />}
          />
        </View>
        <View style={styles.filter}>
          <Text style={styles.subTitle}>Price</Text>
          <View style={styles.sectionFilter}>
            {data?.price?.map(obj => {
              return (
                <ButtonRound
                  title={obj?.label}
                  key={obj?.label}
                  onPress={() => handlePress('price', obj?.value)}
                  containerStyleActive={
                    sort?.price === obj?.value
                      ? styles.containerStyleActive
                      : null
                  }
                  textStylesActive={
                    sort?.price === obj?.value
                      ? styles.textStylesActive
                      : null
                  }
                />
              );
            })}
          </View>

          <Text style={styles.subTitle}>Sort</Text>
          <View style={styles.sectionFilter}>
            {data?.sort?.map((obj, idx) => {
              return (
                <ButtonRound
                  title={obj?.label}
                  key={idx}
                  onPress={() => handlePress('order', obj?.value)}
                  containerStyleActive={
                    sort?.order === obj?.value
                      ? styles.containerStyleActive
                      : null
                  }
                  textStylesActive={
                    sort?.order === obj?.value
                      ? styles.textStylesActive
                      : null
                  }
                />
              );
            })}
          </View>
        </View>

        <ButtonSingle
          title="Apply"
          isLoading={isLoading}
          onPress={onSubmitFilter}
          styleContainer={IsDisableFilter ? styles.styleContainer : null}
          styleTitle={IsDisableFilter ? styles.styleTitle : null}
          disable={IsDisableFilter}
        />
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
    styleIcon: {
      borderWidth: 0,
      borderRadius: 0,
      padding: 0,
    },
    styleModal: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      margin: 0,
    },
    title: {
      fontSize: 14,
      fontFamily: Poppins.extraBold,
      color: colors.text,
    },
    label: {
      fontSize: 14,
      fontFamily: Poppins.semiBold,
      color: colors.text,
    },
    filter: {
      paddingVertical: 5,
      flexDirection: 'column',
      gap: 4,
      marginBottom: 10,
    },
    subTitle: {
      fontSize: 14,
      fontFamily: Poppins.semiBold,
      color: colors.text,
    },
    styleContainer: {
      backgroundColor: colors.containerBlackout,
    },
    styleTitle: {
      color: colors.card,
    },
    sectionFilter: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: 10,
    },
    containerStyleActive: {
      backgroundColor: colors.textActive,
    },
    textStylesActive: {
      color: colors.card
    }
  });
};
