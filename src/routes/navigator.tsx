import React, {useState, useEffect} from 'react';
import ClientsList from '../Components/Clients';
import LogIn from '../Components/Auth/Login';
import ClientForm from '../Components/ClientForm';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigator = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(true);
  }, []);

  return (
    <NavigationContainer>
      {isLogged ? (
        <Tab.Navigator>
          <Tab.Screen name="ClientsList" component={ClientsList} />
          <Tab.Screen name="ClientForm" component={ClientForm} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="LogIn" component={LogIn} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigator;
