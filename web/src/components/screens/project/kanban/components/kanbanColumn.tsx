import { Divider, Heading, Stack, Box, Text } from "@chakra-ui/react";

import { IKanban } from "@localTypes/kanban";
import useTasks from "@hooks/useTasks";
import useTaskTypes from "@hooks/useTaskTypes";

const KanbanColumn = ({ kanban }: { kanban: IKanban }) => {
  const { data: taskTypes } = useTaskTypes();
  const { data: tasks } = useTasks();

  return (
    <Stack
      minWidth="20rem"
      borderRadius={6}
      background="rgb(244,245,247)"
      paddingTop={6}
      paddingBottom={6}
      paddingLeft={4}
      paddingRight={4}
    >
      <Heading size="md">{kanban.name}</Heading>

      <Box paddingTop={2} paddingBottom={2}>
        <Divider />
      </Box>

      <Stack flex="1" overflow="auto">
        {tasks
          ?.filter((task) => task.kanbanId === kanban.id)
          .map((task) => {
            const taskType = taskTypes?.find((tt) => tt.id === task.typeId)?.name;
            return taskType ? (
              <Stack
                key={task.id}
                direction="row"
                align="center"
                background="white"
                padding={4}
                borderRadius={4}
              >
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
