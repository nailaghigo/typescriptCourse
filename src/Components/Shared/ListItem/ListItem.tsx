/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
          style={{alignItems: 'center'}}
          testID="update-button">
          <View style={{alignItems: 'center', paddingLeft: 10}}>
            <Ionicons name="create-outline" size={26} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(id)}
          style={{alignItems: 'center'}}
          testID="delete-button">
          <View style={{alignItems: 'center', paddingLeft: 10}}>
            <Ionicons name="trash-outline" size={26} color="#e47325" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListItem;
