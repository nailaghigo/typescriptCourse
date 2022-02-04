import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.titleName}>Radium Med</Text>
      </View>
    </View>
  );
};

export default Home;
