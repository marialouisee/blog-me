import { createContext } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
    // const user = false
    const user = {username: "Rosa_Kunze41", email: "Therese40@yahoo.com", _id: "614ed71e9594700a85ab1a9c"}

    return (
      <UserContext.Provider value={{user}}>
          {children}
      </UserContext.Provider>
    );
  }
    
export default UserProvider;
    