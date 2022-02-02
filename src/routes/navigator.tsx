import React from 'react';
import ClientsList from '../Components/Clients';
import HomePage from '../Components/HomePage/HomePage';
import LogIn from '../Components/Auth/Login';
import ClientForm from '../Components/ClientForm';
import WelcomePage from '../Components/Welcome/Welcome';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Text, TouchableOpacity, View} from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type NavigatorProps = {
  handleLogin: () => void;
  logged: boolean;
};

const Navigator = ({handleLogin, logged}: NavigatorProps) => {
  function ClientsStackScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="ClientsList"
          component={ClientsList}
          options={{title: 'Clients'}}
        />
        <Stack.Screen
          name="ClientForm"
          component={ClientForm}
          options={({route, navigation}) => ({
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack(null)}
                style={{paddingRight: 70}}>
                <View style={{alignItems: 'center', paddingLeft: 10}}>
                  <AntDesign name="back" size={20} />
                  <Text>Back</Text>
                </View>
              </TouchableOpacity>
            ),
            tabBarButton: () => null,
            title: route.params?.client ? 'Edit Client' : 'Add New Client',
          })}
        />
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      {logged ? (
        <Tab.Navigator
          screenOptions={({route}) => ({
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => {
              if (route.name === 'Home') {
                return (
                  <Ionicons
                    name={focused ? 'home' : 'home-outline'}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Clients') {
                return (
                  <Ionicons
                    name={focused ? 'list' : 'list-outline'}
                    size={size}
                    color={color}
                  />
                );
              }
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen name="Home" component={HomePage} />
          <Tab.Screen name="Clients" component={ClientsStackScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={WelcomePage} />
          <Stack.Screen name="LogIn">
            {() => <LogIn handleLogin={handleLogin} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigator;
