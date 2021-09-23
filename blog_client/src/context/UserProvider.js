import { createContext } from "react";

export const UserContext = createContext();


function UserProvider({ children }) {
    
    const user = {username: "Anna"}
    // console.log(user)

    return (
      <UserContext.Provider value={{user}}>
          {children}
      </UserContext.Provider>
    );
  }
    
export default UserProvider;
    