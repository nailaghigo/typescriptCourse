import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

interface Props {
  id: number;
  name: string;
  email: string;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

const ListItem: React.FC<Props> = ({id, name, email, onUpdate, onDelete}) => {
  return (
    <View style={styles.itemWrapper}>
      <View style={styles.item}>
        <Text style={styles.label}>
          ID: <Text style={styles.data}>{id}</Text>
        </Text>
        <Text style={styles.label}>
          Name: <Text style={styles.data}>{name}</Text>
        </Text>
        <Text style={styles.label}>
          Email: <Text style={styles.data}>{email}</Text>
        </Text>
      </View>
      <View style={styles.containerButtons}>
        <Pressable
          onPress={() => onUpdate(id)}
          style={({pressed}) => [
            {
              borderBottomColor: pressed ? '#202c39' : '#EB9960',
            },
            styles.buttonUpdate,
          ]}>
          {() => <Text>Update</Text>}
        </Pressable>
        <Pressable
          onPress={() => onDelete(id)}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#EFA76B' : '#EB9960',
            },
            styles.buttonDelete,
          ]}>
          {() => <Text>Delete</Text>}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 8,
    marginRight: 8,
    marginTop: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#ffffff',
  },
  item: {
    borderColor: '#263544',
    padding: 10,
  },
  label: {
    fontWeight: '600',
  },
  data: {
    fontWeight: '200',
    fontSize: 14,
    color: '#263544',
    // padding: 2,
  },
  //Buttons delete and update
  containerButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  buttonUpdate: {
    marginRight: 10,
    padding: 6,
    borderRadius: 3,
    borderBottomWidth: 1,
    color: '#EB9960',
  },
  buttonDelete: {
    padding: 6,
    borderRadius: 3,
    color: 'white',
  },
});

export default ListItem;