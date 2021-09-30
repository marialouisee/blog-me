import { createContext, useEffect, useState } from "react";
import { authCheck } from "../helpers/apiCalls";

export const UserContext = createContext();

function UserProvider({ children }) {

  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authCheck();
        console.log('this is user  data', res.data)
        setUser(res.data)
      } catch (error) {
        console.log(error)
      }
    };
    fetchUser();
  }, []);
  console.log('this is user in provider', user)


  const sharedData = {user, setUser};

  return (
    <UserContext.Provider value={sharedData}>{children}</UserContext.Provider>
  );
}

export default UserProvider;
