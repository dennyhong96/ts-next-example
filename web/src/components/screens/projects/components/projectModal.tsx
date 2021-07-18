import { FormEvent, Fragment, RefObject, useState } from "react";
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
  Flex,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Box,
} from "@chakra-ui/react";
import { HashLoader } from "react-spinners";

import useProjectModal from "@hooks/useProjectModal";
import { useEffect } from "react";
import UserSelect from "@components/userSelect";
import useEditProject from "@hooks/useEditProject";
import useAddProjects from "@hooks/useAddProjects";
import ErrorBox from "@components/errorBox";
import useProjectsQueryKey from "@hooks/useProjectsQueryKey";

const INITIAL_FORM_STATE = {
  name: "",
  organization: "",
  userId: "",
};

const ProjectModal = (props: { returnFocusRef?: RefObject<HTMLElement> }) => {
  const { returnFocusRef } = props;

  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const { projectModalOpen, close, isLoading, editingProject } = useProjectModal();
  const { mutate: editProject, error: editError } = useEditProject(useProjectsQueryKey());
  const { mutate: addProject, error: addError } = useAddProjects(useProjectsQueryKey());

  useEffect(() => {
    if (!projectModalOpen || !editingProject) return;
    setForm({
      name: editingProject.name,
      organization: editingProject.organization,
      userId: editingProject.personId,
    });
  }, [editingProject, projectModalOpen]);

  const handleSelectUser = (newUserId: string) => {
    setForm((prev) => ({ ...prev, userId: newUserId }));
  };

  const handleClose = () => {
    close();
    setForm(INITIAL_FORM_STATE);
  };

  const handleEditProject = async (evt: FormEvent) => {
    evt.preventDefault();
    if (!editingProject) return;
    editProject({
      id: editingProject.id,
      name: form.name,
      organization: form.organization,
      personId: form.userId,
    });
    handleClose();
  };

  const handleAddProject = async (evt: FormEvent) => {
    evt.preventDefault();
    if (editingProject) return;
    addProject({
      name: form.name,
      organization: form.organization,
      personId: form.userId,
    });
    handleClose();
  };

  return (
    <Drawer
      size="md"
      isOpen={projectModalOpen}
      placement="right"
      onClose={handleClose}
      finalFocusRef={returnFocusRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        {isLoading ? (
          <Flex
            height={"100vh"}
            width={"100%"}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <HashLoader loading size={25} />
            <Text size="md" marginTop={4}>
              Loading...
            </Text>
          </Flex>
        ) : (
          <Fragment>
            <DrawerCloseButton />
            <DrawerHeader>
              <Heading>{editingProject ? "Edit project" : "Create project"}</Heading>
            </DrawerHeader>

            <DrawerBody display="flex" alignItems="center" justifyContent="center">
              <Box
                as="form"
                width="100%"
                maxWidth={600}
                onSubmit={editingProject ? handleEditProject : handleAddProject}
              >
                <Stack>
                  <FormControl id="project-modal-name">
                    <FormLabel>Project Name</FormLabel>
                    <Input
                      type="text"
                      value={form.name}
                      onChange={(evt) => setForm((prev) => ({ ...prev, name: evt.target.value }))}
                      placeholder="Please enter project name"
                    />
                  </FormControl>

                  <FormControl id="project-modal-organization">
                    <FormLabel>Orgnization</FormLabel>
                    <Input
                      type="text"
                      value={form.organization}
                      onChange={(evt) =>
                        setForm((prev) => ({ ...prev, organization: evt.target.value }))
                      }
                      placeholder="Please enter project organization"
                    />
                  </FormControl>

                  <FormControl id="project-modal-user">
                    <FormLabel>User</FormLabel>
                    <UserSelect personId={form.userId} onChange={handleSelectUser} />
                  </FormControl>

                  <ErrorBox error={editError || addError} />

                  <Button type="submit" colorScheme="teal">
                    {editingProject ? "Confirm Edits" : "Add Project"}
                  </Button>
                </Stack>
              </Box>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={handleClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={editingProject ? handleEditProject : handleAddProject}
              >
                Save
              </Button>
            </DrawerFooter>
          </Fragment>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default ProjectModal;
