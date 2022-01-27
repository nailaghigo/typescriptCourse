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
        <Text style={styles.label}>ID: <Text style={styles.data}>{id}</Text></Text>
        <Text style={styles.label}>Name: <Text style={styles.data}>{name}</Text></Text>
        <Text style={styles.label}>Email: <Text style={styles.data}>{email}</Text></Text>
      </View>
    )
};

const styles = StyleSheet.create({
  item: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    padding: 10,
    borderColor: '#263544',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#ffffff'
  },
  label: {
    fontWeight: '600',
  },
  data: {
    fontWeight: '200',
    fontSize: 15,
    color: '#263544',
    padding: 2
  }
});

export default ListItem;