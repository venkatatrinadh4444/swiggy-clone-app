import { createContext,useContext,useEffect, useState} from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth,firestore} from '../firebase/firebase'
const StoreContext=createContext()

export const ContextProvider=({children})=> {
    const [user,setUser]=useState(null)
    useEffect(()=> {
        const loginUser=onAuthStateChanged(auth,loggedUser=>setUser(loggedUser))

        return ()=>loginUser()
    })

    return <StoreContext.Provider value={{user}}>
        {children}
    </StoreContext.Provider>
}

export const useContextData=()=> {
    return useContext(StoreContext)
}