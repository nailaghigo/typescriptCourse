import React, {useContext} from 'react';
import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import {RootStackParamList} from '../../helper/clientType';
import ListItem from '../../Components/Shared/ListItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppPermissionsContext} from '../../context';

type Props = NativeStackScreenProps<RootStackParamList, 'ClientsList'>;

const ClientList: React.FC<Props> = ({navigation}) => {
  const clientContextProvider = useContext(AppPermissionsContext);

  const onCreateClient = () => {
    navigation.navigate('ClientForm', {
      onSubmit: client => {
        clientContextProvider?.createClient(client);
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
      onSubmit: client => clientContextProvider?.updateClient(client),
      client: clientContextProvider?.clients?.find(
        c => c.id.toString() === clientId?.toString(),
      ),
      onClose: () => navigation.navigate('ClientsList'),
    });
  };

  const onDeleteClient = (id: number) => {
    clientContextProvider?.deleteClient(id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Radium Med</Text>
      </View>
      <FlatList
        ListHeaderComponent={
          <View>
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
        refreshing={clientContextProvider?.loading}
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
