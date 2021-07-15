import { Stack, Input, Button, Box } from "@chakra-ui/react";

import useTasksSearchParams from "@hooks/useTasksSearchParams";
import TaskTypesSelect from "@components/taskTypesSelect";
import UserSelect from "@components/userSelect";

const KanbanSearchPanel = () => {
  const [searchParams, setSearchParams] = useTasksSearchParams();

  const resetSearchParams = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };

  return (
    <Stack direction="row" marginTop={8} marginBottom={8}>
      <Box minWidth="400px">
        <Input
          placeholder="Task name"
          value={searchParams.name}
          onChange={(evt) => setSearchParams({ ...searchParams, name: evt.target.value })}
        />
      </Box>

      <Box minWidth="200px">
        <TaskTypesSelect
          defaultOptionName="Task types"
          taskTypeId={searchParams.typeId || ""}
          onChange={(newTaskTypeId) => setSearchParams({ ...searchParams, typeId: newTaskTypeId })}
        />
      </Box>

      <Box minWidth="200px">
        <UserSelect
          defaultOptionName="Processor"
          personId={searchParams.processorId || ""}
          onChange={(newProcessorId) =>
            setSearchParams({ ...searchParams, processorId: newProcessorId })
          }
        />
      </Box>

      <Button colorScheme="teal" onClick={resetSearchParams}>
        Clear filters
      </Button>
    </Stack>
  );
};

export default KanbanSearchPanel;
