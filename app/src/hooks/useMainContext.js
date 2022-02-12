import { useContext } from "react";
import { MainContext } from "../contexts/MainContextProvider";

export function useMainContext() {
  const context = useContext(MainContext);

  if (!context) {
    throw new Error(
      "useMainContext can only be used with MainContextProvider. Are you trying to use it in a component that's not wrapped in <MainContextProvider>?"
    );
  }

  return context;
}
