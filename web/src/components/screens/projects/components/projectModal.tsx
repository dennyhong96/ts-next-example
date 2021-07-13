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
import { projectListActions, selectProjectModalOpen } from "@store/slices/projectList.slice";
import { RefObject } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProjectModal = (props: { returnFocusRef?: RefObject<HTMLElement> }) => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen);

  const { returnFocusRef } = props;

  const handleClose = () => {
    dispatch(projectListActions.closeProjectModal());
  };

  return (
    <Drawer
      size="full"
      isOpen={projectModalOpen}
      placement="right"
      onClose={handleClose}
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
          <Button variant="outline" mr={3} onClick={handleClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProjectModal;
