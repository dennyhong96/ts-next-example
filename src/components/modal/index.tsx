import { ReactNode } from "react";
import {
  Modal as _Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

interface IModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  cancelLabel?: string;
  confirmLabel?: string;
}

const Modal = (props: IModalProps) => {
  const {
    isOpen,
    onClose,
    title,
    children,
    cancelLabel = "Close",
    confirmLabel = "Confirm",
    onConfirm,
  } = props;

  return (
    <_Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onConfirm}>
            {confirmLabel}
          </Button>

          <Button variant="ghost" onClick={onClose}>
            {cancelLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </_Modal>
  );
};

export default Modal;
