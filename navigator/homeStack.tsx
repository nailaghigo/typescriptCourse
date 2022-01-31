// import React, {useEffect, useState} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Home from '../Components/HomePage';
// import Welcome from '../Components/Welcome';
// import Clients from '../Components/Clients';
// import ClientsForm from '../Components/Clients/Form';
// import Login from '../Components/Auth/Login';

// const ClientsStack = createNativeStackNavigator();

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// const Navigator = () => {
//   const [isLogged, setLogged] = useState(true);

//   useEffect(() => {
//     setLogged(true);
//   }, []);

//   function ClientStackScreen() {
//     return (
//       <ClientsStack.Navigator>
//         <ClientsStack.Screen name="ClientsList" component={Clients} />
//         <ClientsStack.Screen name="ClientsForm" component={ClientsForm} />
//       </ClientsStack.Navigator>
//     );
//   }

//   return isLogged ? (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={{
//           headerShown: false,
//         }}>
//         <Tab.Screen name="Home" component={Home} options={{title: 'Home'}} />
//         <Tab.Screen name="Clients" component={ClientStackScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   ) : (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Welcome" component={Welcome} />
//         <Stack.Screen name="Login" component={Login} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default Navigator;
