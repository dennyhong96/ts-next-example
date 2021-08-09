import dayjs from "dayjs";
import { Box, Flex, Heading, Stack, IconButton, Link, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import useProjectInUrl from "@hooks/useProjectInUrl";
import useEpics from "@hooks/useEpics";
import useTasks from "@hooks/useTasks";
import NextLink from "next/link";
import { useState } from "react";
import Modal from "@components/modal";
import useDeleteEpics from "@hooks/useDeleteEpics";
import useEpicsQueryKey from "@hooks/useEpicsQueryKey";

const ProjectEpicScreen = () => {
  const [deleteModalOpenEpicId, setDeleteModalOpenEpicId] = useState("");
  const { project } = useProjectInUrl();
  const { data: epics } = useEpics();
  const { data: tasks } = useTasks({ projectId: project?.id });
  const { mutateAsync: deleteEpic } = useDeleteEpics(useEpicsQueryKey());

  const handleDeleteModalClose = () => {
    setDeleteModalOpenEpicId("");
  };

  const handleDelete = async (epicId: string) => {
    await deleteEpic(epicId);
    handleDeleteModalClose();
  };

  console.log({ epics });
  console.log({ tasks });

  return (
    <Box p={4}>
      <Heading>Epic - {project?.name}</Heading>

      <Stack>
        {epics?.map((epic) => (
          <Box key={epic.id}>
            <Flex alignItems="center" justifyContent="space-between">
              <Heading size="md">{epic.name}</Heading>
              <IconButton aria-label="Delete Epic" icon={<DeleteIcon />} />
              <Modal
                isOpen={deleteModalOpenEpicId === epic.id}
                onConfirm={() => handleDelete(epic.id)}
                onClose={handleDeleteModalClose}
              >
                <Heading>Delete epic - {epic.name}</Heading>
                <Text>Are your sure that you want to delete epic - {epic.name}?</Text>
              </Modal>
            </Flex>
            <Stack>
              <Stack direction="row">
                <span>Start:</span>
                <span>{dayjs(epic.start).format("MM-DD-YYYY")}</span>
              </Stack>

              <Stack direction="row">
                <span>Start:</span>
                <span>{dayjs(epic.end).format("MM-DD-YYYY")}</span>
              </Stack>

              <Stack>
                {tasks
                  ?.filter((t) => t.epicId === epic.id)
                  .map((t) => (
                    <NextLink
                      href={`/projects/${project?.id}/kanban?editTaskId=${t.id}`}
                      key={t.id}
                      passHref
                    >
                      <Link>{t.name}</Link>
                    </NextLink>
                  ))}
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ProjectEpicScreen;
