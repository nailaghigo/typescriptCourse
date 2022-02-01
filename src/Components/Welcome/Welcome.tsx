import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// Check the any type bellow
type Props = NativeStackScreenProps<any>;

const WelcomePage = ({navigation}: Props) => {
  return (
    <View>
      <Text>Welcome!</Text>
      <Pressable onPress={() => navigation.navigate('LogIn')}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
};

export default WelcomePage;
