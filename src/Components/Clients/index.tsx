import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import clientType, {RootStackParamList} from '../../helper/clientType';
import ListItem from '../../Components/Shared/ListItem';
import Toast from 'react-native-simple-toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppPermissionsContext} from '../../context';

type Props = NativeStackScreenProps<RootStackParamList, 'ClientsList'>;

const ClientList: React.FC<Props> = ({navigation}) => {
  const [clients, setClients] = useState<clientType[]>([]);
  const [isLoading, setLoading] = useState(false);

  const clientContextProvider = useContext(AppPermissionsContext);

  const updateClient = (client: clientType) => {
    setClients(
      clients.map(c => {
        if (c.id === client.id) {
          c.name = client.name;
          c.email = client.email;
        }

        return c;
      }),
    );
  };
  const createClient = (client: clientType) => {
    setClients([
      ...clients,
      {
        id: Math.max(...clients.map(o => o.id), 0) + 1,
        name: client.name,
        email: client.email,
      },
    ]);
  };

  const onCreateClient = () => {
    navigation.navigate('ClientForm', {
      onSubmit: client => {
        createClient;
        createClient(client);
        navigation.navigate('ClientsList');
      },
      onClose: () => {
        navigation.navigate('ClientsList');
      },
    });
  };

  const onUpdateClient = (clientId: number) => {
    navigation.navigate('ClientForm', {
      clientId,
      onSubmit: updateClient,
      client: clients.find(c => c.id.toString() === clientId?.toString()),
      onClose: () => navigation.navigate('ClientsList'),
    });
  };

  const onDeleteClient = (id: number) => {
    setClients(prevClient => {
      Toast.show('Client deleted successfully.');
      return prevClient.filter(client => client.id !== id);
    });
  };

  // const onRefresh = () => {
  //   setLoading(true);
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(response => response.json())
  //     .then(response => {
  //       setClients(response);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       error;
  //     });
  // };

  // useEffect(() => {
  //   onRefresh();
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Radium Med</Text>
      </View>
      <FlatList
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Clients</Text>
            <Pressable
              onPress={onCreateClient}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#EFA76B' : '#EB9960',
                },
                styles.buttonCreate,
              ]}>
              {() => <Text>Add New Client</Text>}
            </Pressable>
          </View>
        }
        keyExtractor={item => item.id.toString()}
        data={clientContextProvider?.clients}
        refreshing={isLoading}
        renderItem={({item}) => (
          <>
            <ListItem
              id={item.id}
              name={item.name}
              email={item.email}
              onUpdate={() => onUpdateClient(item.id)}
              onDelete={() => onDeleteClient(item.id)}
            />
          </>
        )}
      />
    </View>
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

export default ClientList;
