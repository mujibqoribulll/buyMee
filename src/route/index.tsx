import {routes} from './routes';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import {themes} from '../utils/themes';
import {createStackNavigator} from '@react-navigation/stack';
import {createRef} from 'react';

const Stack = createStackNavigator();
export const navigationRef = createRef<NavigationContainerRef<{}>>();
const Routes = () => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? themes.dark : themes.default;

  return (
    <NavigationContainer ref={navigationRef} theme={theme as any}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        {routes.map(route => {
          return (
            <Stack.Screen
              key={route.key}
              name={route.name}
              component={route.component}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
