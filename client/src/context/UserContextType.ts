export type User = {
  id: string;
  pseudo: string;
};

export type Usertype = {
  user: User | null;
  setUser: (user: User | null) => void;
};
