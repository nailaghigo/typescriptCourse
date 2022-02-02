import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {useForm, SubmitHandler} from 'react-hook-form';
import CustomInput from '../Components/Shared/CustomInput';

interface IFormInputs {
  name: string;
  email: string;
}

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const ClientForm = ({route}) => {
  const {
    control: control2,
    handleSubmit: handleSubmit2,
    setValue,
    // formState: {errors},
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    route.params.onSubmit({
      ...route.params.client,
      ...data,
    });
    route.params.onClose();
  };

  useEffect(() => {
    setValue('name', route.params.client?.name);
    setValue('email', route.params.client?.email);
  }, [route, setValue]);

  return (
    <View>
      <CustomInput
        name="name"
        placeholder="Name"
        control={control2}
        keyboardType="default"
        autoCapitalize="none"
        secureTextEntry={false}
        rules={{required: 'Name is required'}}
      />
      <CustomInput
        name="email"
        placeholder="Email"
        control={control2}
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
      <Pressable
        onPress={handleSubmit2(onSubmit)}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#EFA76B' : '#EB9960',
          },
          styles.buttonCreate,
        ]}>
        <Text>Save</Text>
      </Pressable>
      <Pressable
        onPress={route.params.onClose}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#EFA76B' : '#EB9960',
          },
          styles.buttonCreate,
        ]}>
        <Text>Close</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  // button create
  buttonCreate: {
    padding: 6,
    color: '#ffffff',
    borderRadius: 3,
    margin: 5,
    alignSelf: 'center',
    alignItems: 'center',
    width: '30%',
  },
});

export default ClientForm;
