import React from "react";

export type User = {
  username: string | null;
  isAnonymous: boolean;
};

export const UserContext = React.createContext<{
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}>({
  user: { username: null, isAnonymous: false },
  setUser: () => {},
});
