import { Divider, Heading, Stack, Box, Text } from "@chakra-ui/react";

import { IKanban } from "@localTypes/kanban";
import useTasks from "@hooks/useTasks";
import useTaskTypes from "@hooks/useTaskTypes";

const KanbanColumn = ({ kanban }: { kanban: IKanban }) => {
  const { data: tasks } = useTasks();

  const { data: taskTypes } = useTaskTypes();

  return (
    <Stack
      minWidth="20rem"
      borderRadius={6}
      background="rgb(244,245,247)"
      paddingTop={2}
      paddingBottom={2}
      paddingLeft={4}
      paddingRight={4}
    >
      <Heading size="md">{kanban.name}</Heading>

      <Divider />

      <Stack>
        {tasks
          ?.filter((task) => task.kanbanId === kanban.id)
          .map((task) => {
            const taskType = taskTypes?.find((tt) => tt.id === task.typeId)?.name;
            return taskType ? (
              <Stack key={task.id} direction="row" align="center">
                <Text>{task.name}</Text>
                <Box height={4} width={4}>
                  <img src={`/assets/icons/${taskType}.svg`} alt={taskType} />
                </Box>
              </Stack>
            ) : null;
          })}
      </Stack>
    </Stack>
  );
};

export default KanbanColumn;
