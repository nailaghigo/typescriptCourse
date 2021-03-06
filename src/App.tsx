import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import ClientContextProvider from './context';
import Navigator from './routes/navigator';
import {checkPermission, PERMISSION_TYPE} from './AppPermissions';

const App = () => {
  const [logged, setLogged] = useState<boolean>(false);

  const handleLogin = () => {
    setLogged(true);
  };

  useEffect(() => {
    checkPermission(PERMISSION_TYPE.camera);
  }, []);

  return (
    <ClientContextProvider>
      <SafeAreaView style={styles.safeArea}>
        <FlipperAsyncStorage />
        <Navigator handleLogin={handleLogin} logged={logged} />
      </SafeAreaView>
    </ClientContextProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
