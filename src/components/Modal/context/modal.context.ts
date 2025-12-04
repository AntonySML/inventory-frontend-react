import { createContext, useContext } from "react";

interface ModalContextType {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalContext = createContext<ModalContextType>({
  state: false,
  setState: () => {}
});

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("ModalContext must be uset within a ModalContextProvider");
  }

  return context;
};
