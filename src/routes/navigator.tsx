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
        <Stack.Screen name="Clients List" component={ClientsList} />
        <Stack.Screen name="ClientForm" component={ClientForm} />
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
                    name={
                      focused
                        ? 'ios-information-circle'
                        : 'ios-information-circle-outline'
                    }
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'Clients') {
                return (
                  <Ionicons
                    name={focused ? 'ios-list-box' : 'ios-list'}
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
          {/* <Tab.Screen name="ClientForm" component={ClientForm} /> */}
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
