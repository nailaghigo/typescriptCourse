import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import LogIn from './Components/Auth/Login';
import ClientForm from './Components/ClientForm';
import Clients from './Components/Clients';
import clientType from './helper/clientType';
import Toast from 'react-native-simple-toast';
// import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  const [clients, setClients] = useState<clientType[]>([]);
  const [updatingClientId, setUpdatingClientId] = useState<string>();
  const [isLoading, setLoading] = useState(false);
  const [isLogged, setLogged] = useState(false);
  const [displayAdd, setDisplayAdd] = useState(false);

  useEffect(() => {
    setLogged(true);
    setDisplayAdd(false);
  }, []);

  const onUpdateClient = (clientId: string) => {
    setUpdatingClientId(clientId);
  };

  const onDeleteClient = (id: number) => {
    setClients(prevClient => {
      Toast.show('Client deleted successfully.');
      return prevClient.filter(client => client.id !== id);
    });
  };

  const displayAddClientHandle = () => {
    setDisplayAdd(true);
  };

  const updatingClient = clients.find(c => c.id === updatingClientId);

  const onRefresh = () => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(response => {
        setClients(response);
        setLoading(false);
      })
      .catch(error => {
        error;
      });
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const onClose = () => {
    setDisplayAdd(false);
    setUpdatingClientId();
  };

  const handleSubmit = client => {
    if (updatingClient) {
      setClients(
        clients.map(c => {
          if (c.id === client.id) {
            c.name = client.name;
            c.email = client.email;
          }

          return c;
        }),
      );
    } else {
      setClients([
        ...clients,
        {
          id: clients.length + 1,
          name: client.name,
          email: client.email,
        },
      ]);
    }
  };

  return (
    // <NavigationContainer>
    <SafeAreaView style={styles.safeArea}>
      <FlipperAsyncStorage />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Radium Med</Text>
        </View>
        {isLogged ? (
          <>
            {(displayAdd || updatingClient) && (
              <ClientForm
                onSubmit={handleSubmit}
                client={updatingClient}
                onClose={onClose}
              />
            )}
            <Clients
              displayAddClient={displayAddClientHandle}
              onDeleteClient={onDeleteClient}
              onUpdateClient={onUpdateClient}
              clients={clients}
              isLoading={isLoading}
            />
          </>
        ) : (
          <View>
            <LogIn />
          </View>
        )}
      </View>
    </SafeAreaView>
    // </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    alignItems: 'stretch',
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#263544',
  },
  headerTitle: {
    fontSize: 20,
    color: '#EBF0C5',
    fontWeight: '700',
  },
  title: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    color: '#375062',
  },
  item: {
    margin: 5,
    padding: 10,
    backgroundColor: '#EBF0C5',
  },
  itemData: {
    fontSize: 15,
    color: '#FFF',
  },
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

export default App;
