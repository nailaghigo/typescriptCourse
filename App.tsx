import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

import ListItem from './Components/ListItem';

import clientType from './helper/clientType';


const App = () => {

  const [clients, setClients] = useState<clientType[]>([]);
  const [isLoading, setLoading] = useState(false);

  const onRefresh = () => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
    .then( async (response) => await response.json())
    .then((response) => {
      setClients(response)
      setLoading(false)
    })
    .catch((error) => { error});
  }

  useEffect(() => {
    onRefresh()
  }, [])

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Radium Med</Text>
        </View>
        <FlatList
          ListHeaderComponent={<Text style={styles.title}>Clients</Text>}
          keyExtractor={(item) => item.id.toString()}
          data={clients}
          refreshing={isLoading}
          onRefresh={onRefresh}
          renderItem={({item}) => (
            <ListItem
              id={item.id}
              name={item.name}
              email={item.name}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch'
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#263544'
  },
  headerTitle: {
    fontSize: 20,
    color: '#EBF0C5',
    fontWeight: '700'
  },
  title: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    color: '#375062'
  },
  item: {
    margin: 5,
    padding: 10,
    backgroundColor: '#EBF0C5'
  },
  itemData: {
    fontSize: 15,
    color: '#FFF'
  }
});

export default App;