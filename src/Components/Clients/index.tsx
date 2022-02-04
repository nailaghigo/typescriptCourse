import React, {useContext} from 'react';
import {Text, View, FlatList, Pressable} from 'react-native';
import styles from './styles';
import clientType, {RootStackParamList} from '../../helper/clientType';
import ListItem from '../Shared/ListItem/ListItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppPermissionsContext} from '../../context';

type Props = NativeStackScreenProps<RootStackParamList, 'ClientsList'>;

const ClientList: React.FC<Props> = ({navigation}) => {
  const clientContextProvider = useContext(AppPermissionsContext);

  const onCreateClient = () => {
    navigation.navigate('ClientForm');
  };

  const onUpdateClient = (client: clientType) => {
    navigation.navigate('ClientForm', {
      client,
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
        onRefresh={() => clientContextProvider?.getClients()}
        renderItem={({item}) => (
          <>
            <ListItem
              id={item.id}
              name={item.name}
              email={item.email}
              onUpdate={() => onUpdateClient(item)}
              onDelete={() => onDeleteClient(item.id)}
            />
          </>
        )}
      />
    </View>
  );
};

export default ClientList;
