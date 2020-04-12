import { createContext, useContext } from "react";

export const AuthContext = createContext();

// hook for using this context
export function useAuth() {
  return useContext(AuthContext);
}
