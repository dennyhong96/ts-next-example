import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  Heading,
} from "@chakra-ui/react";
import { RefObject } from "react";

const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
  returnFocusRef?: RefObject<HTMLElement>;
}) => {
  const { projectModalOpen, onClose, returnFocusRef } = props;

  return (
    <Drawer
      size="full"
      isOpen={projectModalOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={returnFocusRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Heading>Project Modal</Heading>
        </DrawerHeader>

        <DrawerBody>
          <Input placeholder="Type here..." />
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProjectModal;
