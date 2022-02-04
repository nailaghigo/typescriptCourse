import React from 'react';
import {TouchableHighlight, Text, View} from 'react-native';
import styles from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// Check the any type bellow
type Props = NativeStackScreenProps<any>;

const WelcomePage = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.titleName}>Radium Med</Text>
        <TouchableHighlight
          onPress={() => navigation.navigate('LogIn')}
          underlayColor="#263544"
          style={styles.button}>
          <Text style={styles.buttonTitle}>Log In</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default WelcomePage;
