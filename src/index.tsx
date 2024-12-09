import {Provider} from 'react-redux';
import App from './app';
import {persistor, store} from './store';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { interceptors } from './config/interceptors';
import { StatusBar } from 'react-native';


interceptors();
const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <StatusBar
        backgroundColor={'#0092AC'}
        barStyle={'light-content'}
        translucent={true}
      />
        <App />
      </PersistGate>
    </Provider>
  );
};
export default Root;
