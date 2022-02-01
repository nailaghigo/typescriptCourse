import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import Navigator from './routes/navigator';

const App = () => {
  const [logged, setLogged] = useState<boolean>(false);

  const handleLogin = () => {
    setLogged(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlipperAsyncStorage />
      <Navigator handleLogin={handleLogin} logged={logged} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
