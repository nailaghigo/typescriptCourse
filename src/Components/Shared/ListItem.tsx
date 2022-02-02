import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
        <TouchableOpacity
          onPress={() => onUpdate(id)}
          style={{alignItems: 'center'}}>
          <View style={{alignItems: 'center', paddingLeft: 10}}>
            <AntDesign name="edit" size={20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(id)}
          style={{alignItems: 'center'}}>
          <View style={{alignItems: 'center', paddingLeft: 10}}>
            <AntDesign name="delete" size={20} />
          </View>
        </TouchableOpacity>
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
