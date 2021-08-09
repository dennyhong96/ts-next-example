import dayjs from "dayjs";
import { Box, Flex, Heading, Stack, IconButton, Link, Text, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import useProjectInUrl from "@hooks/useProjectInUrl";
import useEpics from "@hooks/useEpics";
import useTasks from "@hooks/useTasks";
import NextLink from "next/link";
import { useState } from "react";
import Modal from "@components/modal";
import useDeleteEpics from "@hooks/useDeleteEpics";
import useEpicsQueryKey from "@hooks/useEpicsQueryKey";
import CreateEpicDrawer from "./components/createEpic";

const ProjectEpicScreen = () => {
  const [deleteModalOpenEpicId, setDeleteModalOpenEpicId] = useState("");
  const { project } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicsQueryKey());
  const { data: tasks } = useTasks({ projectId: project?.id });
  const { mutateAsync: deleteEpic } = useDeleteEpics(useEpicsQueryKey());

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDeleteModalClose = () => {
    setDeleteModalOpenEpicId("");
  };

  const handleDelete = async (epicId: string) => {
    await deleteEpic(epicId);
    handleDeleteModalClose();
  };

  return (
    <Stack p={4}>
      <Heading>Epic - {project?.name}</Heading>

      <Stack>
        {epics?.map((epic) => (
          <Box key={epic.id} borderBottomWidth="1px" borderBottomColor="gray.100">
            <Flex alignItems="center" justifyContent="space-between">
              <Heading size="md">{epic.name}</Heading>
              <IconButton
                aria-label="Delete Epic"
                icon={<DeleteIcon />}
                borderRadius={4}
                onClick={() => setDeleteModalOpenEpicId(epic.id)}
              />
              <Modal
                isOpen={deleteModalOpenEpicId === epic.id}
                onConfirm={() => handleDelete(epic.id)}
                onClose={handleDeleteModalClose}
                title={`Delete epic - ${epic.name}`}
              >
                <Text>Are your sure that you want to delete epic - {epic.name}?</Text>
              </Modal>
            </Flex>

            <Flex direction="column" color="gray.500">
              <Stack direction="row">
                <span>Start:</span>
                <span>{dayjs(epic.start).format("MM-DD-YYYY")}</span>
              </Stack>
              <Stack direction="row">
                <span>Start:</span>
                <span>{dayjs(epic.end).format("MM-DD-YYYY")}</span>
              </Stack>

              <Stack mt={2}>
                {epic.id &&
                  tasks
                    ?.filter((t) => t.epicId === epic.id)
                    .map((t) => (
                      <NextLink
                        href={`/projects/${project?.id}/kanban?editTaskId=${t.id}`}
                        key={t.id}
                        passHref
                      >
                        <Link color="teal">{t.name}</Link>
                      </NextLink>
                    ))}
              </Stack>
            </Flex>
          </Box>
        ))}
      </Stack>

      <Button width="160px" colorScheme="teal" onClick={() => setIsDrawerOpen(true)}>
        Create Epic
      </Button>
      <CreateEpicDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </Stack>
  );
};

export default ProjectEpicScreen;
