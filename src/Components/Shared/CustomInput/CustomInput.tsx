import React from 'react';
import {View, Text, TextInput, KeyboardTypeOptions} from 'react-native';
import styles from './styles';
import {Controller} from 'react-hook-form';

interface Props {
  control: any;
  defaultValue?: any;
  name: string;
  keyboardType: KeyboardTypeOptions;
  rules: object;
  placeholder: string;
  autoCapitalize: string;
  secureTextEntry: boolean;
}
const CustomInput: React.FC<Props> = ({
  control,
  defaultValue = undefined,
  name,
  keyboardType = 'default',
  rules = {},
  placeholder,
  secureTextEntry,
}) => {
  return (
    <Controller
      defaultValue={defaultValue}
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View style={styles.inputWrapper}>
            <View
              style={[
                styles.container,
                // eslint-disable-next-line react-native/no-inline-styles
                {borderColor: error ? 'red' : '#e8e8e8'},
              ]}>
              <TextInput
                value={value}
                onChangeText={onChange}
                // onChangeText={onChangeText}
                onBlur={onBlur}
                placeholder={placeholder}
                autoCapitalize="none"
                style={styles.input}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
              />
            </View>
            {error && (
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  color: 'red',
                  alignSelf: 'stretch',
                  marginHorizontal: 20,
                }}>
                {error.message || 'Error'}
              </Text>
            )}
          </View>
        </>
      )}
    />
  );
};

export default CustomInput;
