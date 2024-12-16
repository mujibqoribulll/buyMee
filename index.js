/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import Root from './src';
import { startNetworkLogging } from 'react-native-network-logger';

startNetworkLogging();

AppRegistry.registerComponent(appName, () => Root);
