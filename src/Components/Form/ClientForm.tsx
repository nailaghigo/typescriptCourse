import React, {useContext, useEffect} from 'react';
import {Text, View, Pressable} from 'react-native';
import styles from './styles';
import {useForm, SubmitHandler} from 'react-hook-form';
import CustomInput from '../Shared/CustomInput/CustomInput';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../helper/clientType';
import {AppPermissionsContext} from '../../context';

interface IFormInputs {
  id: number;
  name: string;
  email: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'ClientForm'>;

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const ClientForm = ({route, navigation}: Props) => {
  const clientContextProvider = useContext(AppPermissionsContext);

  const {
    control: control2,
    handleSubmit: handleSubmit2,
    setValue,
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    if (route?.params?.client) {
      clientContextProvider?.updateClient({
        ...route.params.client,
        ...data,
      });
    } else {
      clientContextProvider?.createClient(data);
    }
    navigation.goBack();
  };

  useEffect(() => {
    setValue('name', route.params?.client?.name || '');
    setValue('email', route.params?.client?.email || '');
  }, [route, setValue]);

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.client ? 'Edit Client' : 'Add New Client',
    });
  }, [navigation, route.params?.client]);

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
        onPress={() => navigation.goBack()}
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

export default ClientForm;
