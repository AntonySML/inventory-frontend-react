import { useState, type ReactNode } from "react";
import { ModalContext } from "./modal.context";

interface ModalProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProps) => {
  const [state, setState] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ state, setState }}>
      {children}
    </ModalContext.Provider>
  );
};