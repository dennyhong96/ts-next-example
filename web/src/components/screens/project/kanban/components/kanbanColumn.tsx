import { LegacyRef, MutableRefObject, ReactNode } from "react";
import { Divider, Heading, Stack, Box, Text } from "@chakra-ui/react";

import { IKanban } from "@localTypes/kanban";
import useTasks from "@hooks/useTasks";
import useTaskTypes from "@hooks/useTaskTypes";
import CreateTask from "./createTask";
import useTaskModal from "@hooks/useTaskModal";

export const ColumnContainer = ({ children }: { children: ReactNode }) => {
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
      {children}
    </Stack>
  );
};

export const TaskContainer = ({
  children,
  containerRef,
  onClick = () => {}, // eslint-disable-line
}: {
  children: ReactNode;
  containerRef?: MutableRefObject<HTMLElement | undefined>;
  onClick?: () => void;
}) => {
  return (
    <Stack
      onClick={onClick}
      ref={containerRef as LegacyRef<HTMLDivElement> | undefined}
      direction="row"
      align="center"
      background="white"
      padding={4}
      borderRadius={4}
      cursor="pointer"
    >
      {children}
    </Stack>
  );
};

const KanbanColumn = ({ kanban }: { kanban: IKanban }) => {
  const { data: taskTypes } = useTaskTypes();
  const { data: tasks } = useTasks();
  const { open } = useTaskModal();

  return (
    <ColumnContainer>
      <Heading size="md">{kanban.name}</Heading>

      <Box paddingTop={2} paddingBottom={2}>
        <Divider />
      </Box>

      <Stack
        flex="1"
        overflow="auto"
        css={`
          /* Hide scrollbar for Chrome, Safari and Opera */
          ::-webkit-scrollbar {
            display: none;
          }
          /* Hide scrollbar for IE, Edge and Firefox */
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        `}
      >
        {tasks
          ?.filter((task) => task.kanbanId === kanban.id)
          .map((task) => {
            const taskType = taskTypes?.find((tt) => tt.id === task.typeId)?.name;
            return taskType ? (
              <TaskContainer key={task.id} onClick={() => open(task.id)}>
                <Text>{task.name}</Text>
                <Box height={4} width={4}>
                  <img src={`/assets/icons/${taskType}.svg`} alt={taskType} />
                </Box>
              </TaskContainer>
            ) : null;
          })}

        <CreateTask kanbanId={kanban.id} />
      </Stack>
    </ColumnContainer>
  );
};

export default KanbanColumn;
