import { createContext } from "react";

export const UserContext = createContext();


function UserProvider({ children }) {
    
    // const user = false
    const user = {username: "Thora_Spencer73", email: "Mavis_Torp30@gmail.com", _id: "614d937e2a269f6d55862246"}
    // console.log(user)

    return (
      <UserContext.Provider value={{user}}>
          {children}
      </UserContext.Provider>
    );
  }
    
export default UserProvider;
    