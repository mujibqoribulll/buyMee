import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../home-page';
import Transaction from '../transaction';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {shallowEqual} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {
  IconAccount,
  IconAccountActive,
  IconBag,
  IconBagActive,
  IconHome,
  IconHomeActive,
  IconTransaction,
  IconTransactionActive,
} from '../../assets';
import Ripple from 'react-native-material-ripple';
import {palettes} from '../../utils/palettes';
import Profile from '../profile';
import {navigationRef} from '../../route';
import {postLoginReset, postLogoutReset} from '../../slices/authSlice';

const Tab = createBottomTabNavigator();

const TabHome = ({navigation, route}: any) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth, shallowEqual);
  const {colors} = useTheme();

  const tabDefaultStyle = {
    headerShown: false,
    // unmountOnBlur: true,
    tabBarActiveTintColor: colors.textActive,
    tabBarInactiveTintColor: colors.textInactive,
    tabBarLabelStyle: {
      fontSize: 14,
      // fontFamily: openSans.semiBold,
    },
    tabBarIconStyle: {
      width: 24,
      height: 24,
    },
    tabBarItemStyle: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
      height: 72,
    },
  };

  const Icon = ({icon}: any) => {
    return <View style={styles.tabBarIcon}>{icon}</View>;
  };

  const setIcon = (route, focused) => {
    switch (route) {
      case 'home-page':
        return focused ? <IconHomeActive /> : <IconHome />;
      case 'transaction':
        return focused ? <IconTransactionActive /> : <IconTransaction />;
      case 'cart':
        return focused ? <IconBagActive /> : <IconBag />;
      case 'profile':
        return focused ? <IconAccountActive /> : <IconAccount />;
      default:
        return focused ? <IconHomeActive /> : <IconHome />;
    }
  };

  useEffect(() => {
    if (auth.logout.loading === 'succeeded') {
      navigationRef.current?.reset({
        index: 0,
        routes: [{name: 'login'}],
      });
      dispatch(postLogoutReset());
      dispatch(postLoginReset());
    }
  }, [auth]);

  const setLabel = (route: string) => {
    switch (route) {
      case 'home-page':
        return 'Home';
      case 'transaction':
        return 'Transaksi';
      case 'cart':
        return 'Keranjang';
      case 'inbox':
      case 'profile':
        return 'Profile';
      default:
        return 'Home';
    }
  };

  const setOptions = route => {
    const unmountOnBlurKeys = ['transaction', 'inbox'];
    return {
      unmountOnBlur: unmountOnBlurKeys.includes(route),
      tabBarLabel: setLabel(route),
      tabBarIcon: ({focused}) => <Icon icon={setIcon(route, focused)} />,
      tabBarButton: props => <Ripple {...props} rippleCentered={true} />,
      tabBarStyle: styles.tabBar,
      ...tabDefaultStyle,
    };
  };

  const publicRoutes = [
    {
      name: 'home-page',
      component: HomePage,
      options: setOptions('home-page'),
    },
  ];

  const privateRoutes = [
    {
      name: 'home-page',
      component: HomePage,
      options: setOptions('home-page'),
    },
    {
      name: 'transaction',
      component: Transaction,
      options: setOptions('transaction'),
    },
    {
      name: 'profile',
      component: Profile,
      options: setOptions('profile'),
    },
  ];
  return (
    <Tab.Navigator
      initialRouteName={'home-page'}
      // barStyle={{backgroundColor: '#6200EE'}}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      {auth?.login?.data?.accessToken
        ? privateRoutes.map((route, index) => {
            return (
              <Tab.Screen
                name={route.name}
                key={route.name}
                component={route.component}
                options={route.options as any}
              />
            );
          })
        : publicRoutes.map((route, index) => {
            return (
              <Tab.Screen
                name={route.name}
                key={route.name}
                component={route.component}
                options={route.options as any}
              />
            );
          })}
    </Tab.Navigator>
  );
};

export default TabHome;

const useStyles = (colors = palettes.default) =>
  StyleSheet.create({
    tabBar: {
      backgroundColor: colors.container,
      minHeight: 65,
    },
  });
