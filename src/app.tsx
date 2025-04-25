/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import Routes from './route';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { toastConfig } from './utils/toastConfig';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Routes />
      <Toast position={'bottom'} />
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}

export default App;
