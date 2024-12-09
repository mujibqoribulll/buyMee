import {useTheme} from '@react-navigation/native';
import {
  ImageBackground,
  StyleSheet,
  Text,
  ToastAndroid,
  useWindowDimensions,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ImageLogin} from '../../assets';
import InputText from '../../../components/input-text';
import ButtonSingle from '../../../components/button-single';
import Gap from '../../../components/gap';
import {UseFormLoginState} from './useFormLoginState';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {postLogin} from '../../slices/authThunk';
import {shallowEqual} from 'react-redux';
import {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {isSubmitDisabled} from '../../helper/form';
import {postLoginReset, postLogoutReset} from '../../slices/authSlice';
import { PlayfairDisplay } from '../../utils/fonts';

type FormStateType = {
  label: string;
  value?: string;
  error: boolean;
  required: boolean;
  message?: string;
};

const Login = (props: any) => {
  const {navigation} = props;
  const {height, width} = useWindowDimensions();
  const styles = useStyles(height, width);
  const dispatch = useAppDispatch();

  const state = useAppSelector(state => state.auth, shallowEqual);

  const {login} = state;

  const {
    form,
    function: {setForm},
  } = UseFormLoginState();


  useEffect(() => {
    const {loading} = login;
    if (loading === 'succeeded') {
      navigation?.replace('tab-home');
    } else if (loading === 'failed') {
      showToastError();
    }
  }, [login, form]);

  const showToastError = () => {
    try {
      const {message} = login;
      Toast.show({
        type: 'error',
        text1: message,
      });
    } catch (error) {}
  };

  const onSubmit = () => {
    if (isSubmitDisabled(form)) {
      setForm('@revalidate');
      return;
    }
    let payload = {
      username: form?.username?.value,
      password: form?.password?.value,
    };
    dispatch(postLogin(payload));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={ImageLogin} style={styles.background}>
        <View style={styles.overlay}>
          <View style={styles.headerCard}>
            <Text style={styles.text}>Login</Text>
            <View style={styles.card}>
              <InputText
                placeholder="Masukan Username Anda"
                label={form.username.label}
                onChangeText={val => setForm('username', val)}
                value={form.username.value}
                helper={form.username.message}
              />
              <InputText
                placeholder="Masukan Password Anda"
                label={form.password.label}
                onChangeText={val => setForm('password', val)}
                value={form.password.value}
                type={form.password.type}
              />
              <Gap height={15} />
              <ButtonSingle
                title="Continue"
                isLoading={login.loading === 'pending'}
                onPress={onSubmit}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;

const useStyles = (height: number, width: number) => {
  const {colors} = useTheme();
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.container,
    },
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.25)', // transparansi jika diinginkan
      width: '100%',
      height: '100%',
    },
    text: {
      color: colors.container,
      fontSize: 28,
      marginBottom: 10,
      fontFamily: PlayfairDisplay.medium,
    },
    headerCard: {
      flex: 1,
      marginHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: '100%',
      height: '100%',
    },
    card: {
      padding: 15,
      backgroundColor: 'rgba(0, 0, 0, 0.50)',
      borderRadius: 10,
      width: width / 1 - 40,
    },
  });
};
