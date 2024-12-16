import React, {useState} from 'react';
import {Button, View} from 'react-native';
import {useNavigateToScreen} from '../../src/helper/hooks';

const NetLog = () => {
  const [show, setShow] = useState(true);
  const {navigateToScreen} = useNavigateToScreen();
  if (!show) {
    return null;
  }

  return (
    <View
      position="absolute"
      bottom={80}
      right={30}
      backgroundColor="white"
      shadowColor="black"
      shadowOpacity={0.2}
      shadowOffset={{height: 2, width: 0}}
      borderRadius={25}
      style={{flexDirection: 'row'}}>
      <Button
        title="NetLog"
        onPress={() => {
          navigateToScreen('netlog-screen');
        }}
      />

      <Button
        title={'X'}
        onPress={() => {
          setShow(!show);
        }}
      />
    </View>
  );
};

export default NetLog;
