'use client'
import { createContext } from 'react'
 
export const SessionContext = createContext();
export const UserContext = createContext();

export function UserProvider({children, session, user}) {
    return (
        <SessionContext.Provider value={session}>
            <UserContext.Provider value={user}>
                {children}
            </UserContext.Provider>
        </SessionContext.Provider>
    )
}