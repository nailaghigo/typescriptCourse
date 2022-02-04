import React from 'react';
import {Text, View} from 'react-native';
import styles from '../../Auth/Login/styles';
import {useForm} from 'react-hook-form';
import CustomButton from '../../Shared/CustomButton/CustomButton';
import CustomInput from '../../Shared/CustomInput/CustomInput';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Data {
  email: String;
  password: String;
}

const user1 = {
  email: 'user@test.com',
  password: 'test123',
};

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

type LoginProps = {
  handleLogin: () => void;
};

const LogIn = ({handleLogin}: LoginProps) => {
  const {
    control,
    handleSubmit,
    // formState: {errors},
  } = useForm<Data>({
    defaultValues: {
      email: user1.email,
      password: user1.password,
    },
  });

  const onSignInPressed = (data: Data) => {
    if (user1.email !== data.email) {
      return Toast.show('Invalid user, try again.');
    }
    if (user1.password !== data.password) {
      return Toast.show('Invalid password, try again.');
    }
    storeData(data);
    handleLogin();
  };

  const storeData = async (value: Data) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <CustomInput
        name="email"
        placeholder="Email"
        control={control}
        keyboardType="email-address"
        autoCapitalize="none"
        secureTextEntry={false}
        rules={{
          required: 'Email is required',
          pattern: {
            value: EMAIL_REGEX,
            message: 'Email is invalid',
          },
        }}
      />
      <CustomInput
        name="password"
        keyboardType="default"
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry={true}
        control={control}
        rules={{required: 'Password is required'}}
      />
      <CustomButton
        onPress={handleSubmit(onSignInPressed)}
        text="Log In"
        bgColor="#d98a57"
        fgColor="white"
      />
    </View>
  );
};

export default LogIn;
