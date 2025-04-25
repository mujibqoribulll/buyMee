import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
  successWithAction: ({ text1, text2, onPress }) => (
    <View
      style={{
        backgroundColor: '#e0f8e9',
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 10,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{text1}</Text>
        {text2 && <Text>{text2}</Text>}
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          marginLeft: 10,
          paddingHorizontal: 12,
          paddingVertical: 6,
          backgroundColor: '#0092AC',
          borderRadius: 6,
        }}
      >
        <Text style={{ color: 'white' }}>View</Text>
      </TouchableOpacity>
    </View>
  ),
};