import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import {useForm, SubmitHandler} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListItem from './Components/ListItem';
import CustomInput from './Components/CustomInput';
import CustomButton from './Components/CustomButton';
import clientType from './helper/clientType';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import Toast from 'react-native-simple-toast';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
interface Data {
  email: String;
  password: String;
}

const user1 = {
  email: 'asd@test.com',
  password: 'test1',
};

const App = () => {
  const [clients, setClients] = useState<clientType[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isLogged, setLogged] = useState(false);
  const [displayAdd, setDisplayAdd] = useState(false);
  const [selectedClient, setSelectedClient] = useState<clientType | null>(null);

  const onRefresh = () => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(response => {
        setClients(response);
        setLoading(false);
      })
      .catch(error => {
        error;
      });
  };

  // useEffect

  useEffect(() => {
    onRefresh();
  }, []);

  const storeData = async (value: Data) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const {
    control,
    handleSubmit,
    // formState: {errors},
  } = useForm<Data>({
    defaultValues: {
      email: user1.email,
      password: user1.password,
    },
  });

  const {
    control: control2,
    handleSubmit: handleSubmit2,
    setValue,
    // formState: {errors},
  } = useForm<IFormInputs>();

  const onSignInPressed = (data: Data) => {
    if (user1.email !== data.email) {
      return Toast.show('Invalid user, try again.');
    }
    if (user1.password !== data.password) {
      return Toast.show('Invalid password, try again.');
    }
    storeData(data);
    setLogged(true);
  };

  const displayAddClient = () => {
    setSelectedClient(null);
    setValue('newName', '');
    setValue('newEmail', '');
    setDisplayAdd(true);
  };

  const closeAddClient = () => {
    console.log('button pressed');
    setDisplayAdd(false);
  };

  const updateItem = (client: clientType) => {
    setSelectedClient(client);
    setValue('newName', client.name);
    setValue('newEmail', client.email);
    setDisplayAdd(true);
  };

  const deleteItem = (id: number) => {
    setClients(clients.filter(client => client.id != id));
  };
  interface IFormInputs {
    newName: string;
    newEmail: string;
  }

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    if (selectedClient) {
      setClients(
        clients.map(client => {
          if (client.id === selectedClient.id) {
            client.name = data.newName;
            client.email = data.newEmail;
          }

          return client;
        }),
      );
    } else {
      setClients([
        ...clients,
        {
          id: clients.length + 1,
          name: data.newName,
          email: data.newEmail,
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlipperAsyncStorage />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Radium Med</Text>
        </View>
        {isLogged ? (
          <>
            {displayAdd && (
              <View>
                <CustomInput
                  name="newName"
                  placeholder="Name"
                  control={control2}
                  keyboardType="default"
                  autoCapitalize="none"
                  secureTextEntry={false}
                  rules={{required: 'Name is required'}}
                />
                <CustomInput
                  name="newEmail"
                  placeholder="Email"
                  control={control2}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  secureTextEntry={false}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: EMAIL_REGEX,
                      message: 'Email is invalid',
                    },
                  }}
                />
                <Pressable
                  onPress={handleSubmit2(onSubmit)}
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed ? '#EFA76B' : '#EB9960',
                    },
                    styles.buttonCreate,
                  ]}>
                  <Text>Save</Text>
                </Pressable>
                <Pressable
                  onPress={closeAddClient}
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed ? '#EFA76B' : '#EB9960',
                    },
                    styles.buttonCreate,
                  ]}>
                  <Text>Close</Text>
                </Pressable>
              </View>
            )}
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
              onRefresh={onRefresh}
              renderItem={({item}) => (
                <>
                  <ListItem
                    id={item.id}
                    name={item.name}
                    email={item.email}
                    onUpdate={() => updateItem(item)}
                    onDelete={() => deleteItem(item.id)}
                  />
                </>
              )}
            />
          </>
        ) : (
          <View>
            <Text style={styles.title}>Log In</Text>
            <CustomInput
              name="email"
              placeholder="Email"
              control={control}
              keyboardType="email-address"
              autoCapitalize="none"
              secureTextEntry={false}
              rules={{
                required: 'Email is required',
                pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
              }}
            />
            <CustomInput
              name="password"
              keyboardType="default"
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={true}
              control={control}
              rules={{required: 'Password is required'}}
            />
            <CustomButton
              onPress={handleSubmit(onSignInPressed)}
              text="Log In"
              bgColor="#d98a57"
              fgColor="white"
            />
          </View>
        )}
      </View>
    </SafeAreaView>
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

export default App;
