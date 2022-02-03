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
  ClientForm?: {
    client?: clientType;
  };
};
export interface iClientContext {
  clients: clientType[] | null;
  loading: boolean;
  deleteClient: (id: number) => void;
  createClient: (client: clientType) => void;
  updateClient: (client: clientType) => void;
  getClients: () => void;
}

export default clientType;
