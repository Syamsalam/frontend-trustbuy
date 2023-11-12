import { useContext } from "react";
import { createContext } from "react";

const UserContext = createContext({
    user : null,
    setUser : () => {}
})

export const useUser = () => useContext(UserContext)


export default UserContext