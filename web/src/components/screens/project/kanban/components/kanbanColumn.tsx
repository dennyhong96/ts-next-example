import React from "react";

import { IKanban } from "@localTypes/kanban";
import { Heading, Stack } from "@chakra-ui/react";
import useTasks from "@hooks/useTasks";

const KanbanColumn = ({ kanban }: { kanban: IKanban }) => {
  const { data: tasks } = useTasks({ kanbanId: kanban.id, enabled: !!kanban.id });

  return (
    <Stack>
      <Heading size="md" marginBottom={4}>
        {kanban.name}
      </Heading>

      <Stack>
        {tasks?.map((task) => (
          <div key={task.id}>{task.name}</div>
        ))}
      </Stack>
    </Stack>
  );
};

export default KanbanColumn;
