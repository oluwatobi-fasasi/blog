import { supabase } from "@/supabase";
import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(null); // Initialize to null

  // Sign Up
  const signUpNewUser = async (email, password, first_name) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: first_name,
        },
      },
    });
    if (error) {
      console.log("Error: ", error);
      return { error };
    }
    return { data };
  };

  // Sign In
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        console.log("Error: ", error);
        return { error };
      }
      return { data };
    } catch (error) {
      console.log("Error: ", error);
      return { error };
    }
  };

  // Sign Out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error: ", error);
    }
  };

  // Check session on mount and auth state changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, signUpNewUser, signOut, signInUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
