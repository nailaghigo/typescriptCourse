import React, {FC, useState, useEffect} from 'react';
import {createContext} from 'react';
import clientType, {iClientContext} from '../helper/clientType';
import Toast from 'react-native-simple-toast';
import fetch from 'cross-fetch';

export const AppPermissionsContext = createContext<iClientContext | null>(null);

const ClientContextProvider: FC = ({children}) => {
  const [clients, setClients] = useState<clientType[]>([]);
  const [loading, setLoading] = useState(false);

  const getClients = () => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(async response => await response.json())
      .then(response => {
        setClients(response);
        setLoading(false);
      })
      .catch(error => {
        error;
      });
  };

  useEffect(() => {
    getClients();
  }, []);

  const deleteClient = (id: number) => {
    setClients(prevClient => {
      Toast.show('Client deleted successfully.');
      return prevClient.filter(client => client.id !== id);
    });
  };

  const createClient = (client: clientType) => {
    setClients([
      ...clients,
      {
        id: Math.max(...clients.map(o => o.id), 0) + 1,
        name: client.name,
        email: client.email,
      },
    ]);
  };

  const updateClient = (client: clientType) => {
    setClients(
      clients.map(c => {
        if (c.id === client.id) {
          c.name = client.name;
          c.email = client.email;
        }
        return c;
      }),
    );
  };

  return (
    <AppPermissionsContext.Provider
      value={{
        clients,
        loading,
        getClients,
        deleteClient,
        createClient,
        updateClient,
      }}>
      {children}
    </AppPermissionsContext.Provider>
  );
};

export default ClientContextProvider;
