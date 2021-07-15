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
      <Box>
        <Input
          placeholder="Task Name"
          value={searchParams.name}
          onChange={(evt) => setSearchParams({ ...searchParams, name: evt.target.value })}
        />
      </Box>

      <Box>
        <UserSelect
          defaultOptionName="Select Processor"
          personId={searchParams.processorId || ""}
          onChange={(newProcessorId) =>
            setSearchParams({ ...searchParams, processorId: newProcessorId })
          }
        />
      </Box>

      <Box>
        <TaskTypesSelect
          taskTypeId={searchParams.typeId || ""}
          onChange={(newTaskTypeId) => setSearchParams({ ...searchParams, typeId: newTaskTypeId })}
        />
      </Box>

      <Button colorScheme="teal" onClick={resetSearchParams}>
        Clear Filters
      </Button>
    </Stack>
  );
};

export default KanbanSearchPanel;
