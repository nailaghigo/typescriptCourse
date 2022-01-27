
import React from 'react';
import {View, Text, TextInput, StyleSheet, KeyboardTypeOptions} from 'react-native';
import {Controller} from 'react-hook-form';

interface Props {
  control: any,
  name: string,
  keyboardType: KeyboardTypeOptions,
  rules: object,
  placeholder: string,
  // secureTextEntry
}
const CustomInput : React.FC<Props> =({
  control,
  name,
  keyboardType = 'default',
  rules = {},
  placeholder,
  // secureTextEntry,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
        <View style={styles.inputWrapper}>
          <View
            style={[
              styles.container,
              {borderColor: error ? 'red' : '#e8e8e8'},
            ]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              keyboardType={keyboardType}
              // secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
          )}
        </View>
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
    inputWrapper: {
      width: '95%'

    },
    container: {
      backgroundColor: 'white',
      width: '95%',
      alignSelf: 'center',
      borderColor: '#e8e8e8',
      borderWidth: 1,
      borderRadius: 3,
      paddingHorizontal: 10,
      marginVertical: 5,
    },
    input: {
      padding: 10,
    },
  });

  export default CustomInput;