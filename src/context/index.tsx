import React, {FC, useState, useEffect} from 'react';
import {createContext} from 'react';
import clientType, {iClientContext} from '../helper/clientType';

export const AppPermissionsContext = createContext<iClientContext | null>(null);

// interface AppPermissions {
//   updateClient: (client: clientType) => void;
//   createClient: (client: clientType) => void;
//   children: JSX.Element | JSX.Element[];
// }

/*export const AppPermissionsContext = React.createContext<
  AppPermissions | undefined
>(undefined);
// */
// export type APIProviderProps = {
//   children: JSX.Element | JSX.Element[];
// };

const ClientContextProvider: FC = ({children}) => {
  const [clients, setClients] = useState<clientType[]>([]);
  const [loading, setLoading] = useState(false);

  const getClients = () => {
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

  useEffect(() => {
    getClients();
  }, []);
  // const updateClient = (client: clientType) => {
  //   setClients(
  //     clients.map(c => {
  //       if (c.id === client.id) {
  //         c.name = client.name;
  //         c.email = client.email;
  //       }

  //       return c;
  //     }),
  //   );
  // };
  // const createClient = (client: clientType) => {
  //   setClients([
  //     ...clients,
  //     {
  //       id: Math.max(...clients.map(o => o.id), 0) + 1,
  //       name: client.name,
  //       email: client.email,
  //     },
  //   ]);
  // };

  // useEffect(() => {
  // }, []);

  // return the Provider component wrapping the children prop and set the value property, so // when we use it we only need to pass the children prop
  return (
    <AppPermissionsContext.Provider
      value={{
        // updateClient,
        // createClient,
        clients,
        loading,
      }}>
      {children}
    </AppPermissionsContext.Provider>
  );
};

export default ClientContextProvider;
