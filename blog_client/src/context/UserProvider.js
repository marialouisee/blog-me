import { createContext, useEffect, useState } from "react";
import { authCheck } from "../helpers/apiCalls";
import toast from "react-hot-toast";

export const UserContext = createContext();

function UserProvider({ children }) {

  const [user, setUser] = useState();
  const [authIsDone, setAuthIsDone] = useState(false);

  useEffect(() => {
    const authUser = async () => {
      try {
        const res = await authCheck();
        if (!res.error){
          setUser(res.data)
          setAuthIsDone(true)
          return
        }
        setUser()
        setAuthIsDone(true)
       
      } catch (err) {
        toast(`${err.message}`)
      }
    };
    authUser();
  }, []);

  // console.log('this is user in provider', user)


  const sharedData = { user, setUser, authIsDone,setAuthIsDone };

  return (
    <UserContext.Provider value={sharedData}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
