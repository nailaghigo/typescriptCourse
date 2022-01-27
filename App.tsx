import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import { useForm } from 'react-hook-form';

import ListItem from './Components/ListItem';
import CustomInput from './Components/CustomInput';
import CustomButton from './Components/CustomButton';
import clientType from './helper/clientType';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
interface Data {
  email: String,
  password: String,
}

const user1 = {
  email: 'asd@test.com',
  password: 'test1'
}

const App = () => {

  const [clients, setClients] = useState<clientType[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isLogged, setLogged] = useState(false);


  const onRefresh = () => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((response) => {
      setClients(response)
      setLoading(false)
    })
    .catch((error) => { error});
  }

  // useEffect

  useEffect(() => {
    onRefresh()
  }, [])

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<Data>();

  const onSignInPressed = (data: Data) => {
    console.log(data.email, data.password);
    if(data.email === user1.email && data.password === user1.password) {
      setLogged(true)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Radium Med</Text>
        </View>
        {
          isLogged
            ? <FlatList
                ListHeaderComponent={<Text style={styles.title}>Clients</Text>}
                keyExtractor={(item) => item.id.toString()}
                data={clients}
                refreshing={isLoading}
                onRefresh={onRefresh}
                renderItem={({item}) => (
                  <ListItem
                    id={item.id}
                    name={item.name}
                    email={item.email}
                  />
                )}
              />
            : //Login
            <View>
              <Text style={styles.title}>Log In</Text>
              <CustomInput
                  name="email"
                  placeholder="Email"
                  control={control}
                  keyboardType='email-address'
                  rules={{
                    required: 'Email is required',
                    pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
                  }}
                />
                <CustomInput
                  name="password"
                  keyboardType="default"
                  placeholder="Password"
                  control={control}
                  rules={{required: 'Password is required'}}
                />
              <CustomButton
                // text={loading ? 'Loading...' : 'Sign In'}
                onPress={handleSubmit(onSignInPressed)}
                text= 'Log In'
                bgColor= '#d98a57'
                fgColor= 'white'
             />
            </View>
        }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    alignItems: 'stretch',
    flex: 1
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
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