import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// Check the any type bellow
type Props = NativeStackScreenProps<any>;

const WelcomePage = ({navigation}: Props) => {
  return (
    <View>
      <Text>Welcome!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomePage;
