import { RefObject } from "react";
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

import useProjectModal from "@hooks/useProjectModal";

const ProjectModal = (props: { returnFocusRef?: RefObject<HTMLElement> }) => {
  const { returnFocusRef } = props;

  const { projectModalOpen, close } = useProjectModal();

  return (
    <Drawer
      size="full"
      isOpen={projectModalOpen}
      placement="right"
      onClose={close}
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
          <Button variant="outline" mr={3} onClick={close}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProjectModal;
