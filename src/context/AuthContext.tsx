import { createContext, useEffect, useState } from "react";
// @ts-ignore-next-line
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
// @ts-ignore-next-line
export const AuthContext = createContext();
// @ts-ignore-next-line
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      // @ts-ignore-next-line
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
