import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  id: number;
  name: string;
  email: string;
}

const ListItem: React.FC<Props> = ({id, name, email}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.data}>ID: {id}</Text>
        <Text style={styles.data}>Name: {name}</Text>
        <Text style={styles.data}>Email: {email}</Text>
      </View>
    )
};

const styles = StyleSheet.create({
  item: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    padding: 10,
    backgroundColor: '#C2D09C'
  },
  data: {
    fontSize: 15,
    color: '#FFF'
  }
});

export default ListItem;