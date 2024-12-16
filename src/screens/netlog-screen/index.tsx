import { Button} from 'react-native';
import React from 'react';
import NetworkLogger from 'react-native-network-logger';
import {useNavigation} from '@react-navigation/native';
import {useNavigateToScreen} from '../../helper/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';

export const NetLogScreen = () => {
  const {navigateToScreen} = useNavigateToScreen();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Button
        title="Back"
        color={'#0092AC'}
        onPress={() => {
          navigateToScreen('back');
        }}
      />
      <NetworkLogger theme="dark" />
    </SafeAreaView>
  );
};
