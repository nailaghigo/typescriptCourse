import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import ListItem from '../ListItem';
import clientType from '../../helper/clientType';
import {useForm} from 'react-hook-form';

const Clients = ({displayAddClient, onUpdateClient, onDeleteClient, clients, isLoading}) => {

  return (
    <FlatList
      ListHeaderComponent={
        <View>
          <Text style={styles.title}>Clients</Text>
          <Pressable
            onPress={displayAddClient}
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
      data={clients}
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

export default Clients;
