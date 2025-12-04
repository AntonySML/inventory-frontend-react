import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useModalContext } from "./context/modal.context";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

interface Props {
  children: React.ReactNode;
}
export const CustomModal = ({ children }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { state, setState } = useModalContext();

  const closeModal = () => {
    setState(false);
  };
  const modalRoot = document.getElementById("modal");

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setState(false);
      }
    };

    if (state) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [setState, state]);

  if (!state || !modalRoot) {
    return null;
  }

  return createPortal(
    <>
      <div className="overlay" onClick={closeModal}>
        <div className="modal" onClick={handleContentClick} ref={modalRef}>
          <Dialog open={state} onClose={closeModal}>
            <DialogContent>{children}</DialogContent>
          </Dialog>
        </div>
      </div>
    </>,
    modalRoot
  );
};
