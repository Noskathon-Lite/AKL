import React,{useState,createContext} from 'react';
//create context
 export const UserSidebarContext=createContext();

const UserSidebarProvider = ({children}) => {
 //sidebar state
 const[isUserOpen,setIsUserOpen]=useState(false);

 const handleclose=()=>{
  setIsUserOpen(false);
 }

  return (
   <UserSidebarContext.Provider value={{isUserOpen,setIsUserOpen, handleclose}}>
      {children}
    </UserSidebarContext.Provider>
    );
};

export default UserSidebarProvider;
