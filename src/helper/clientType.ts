type clientType = {
  id: number;
  name: string;
  email: string;
};

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Welcome: undefined;
  ClientsList: undefined;
  ClientForm: {
    clientId?: number;
    // clients: clientType[];
    client?: clientType | undefined;
    onSubmit: (client: clientType) => void;
    onClose: () => void;
    // selectedClient: {
    //   id: number;
    //   name: string;
    //   email: string;
    // };
    // setClients: React.Dispatch<React.SetStateAction<clientType[]>>;
  };
};
export interface iClientContext {
  clients: clientType[] | null;
  loading: boolean;
  deleteClient: (id: number) => void;
  createClient: (client: clientType) => void;
  updateClient: (client: clientType) => void;
}

export default clientType;
