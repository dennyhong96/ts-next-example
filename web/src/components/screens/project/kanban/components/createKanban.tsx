import { FormEvent, useState } from "react";
import { Button, Input, Stack } from "@chakra-ui/react";

import useAddKanbans from "@hooks/useAddKanbans";
import useKanbanQueryKey from "@hooks/useKanbanQueryKey";
import { ColumnContainer } from "./kanbanColumn";
import { useProjectIdInUrl } from "@hooks/useProjectInUrl";

const CreateKanban = () => {
  const [newKanbanName, setNewKanbanName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanbans(useKanbanQueryKey());

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    await addKanban({
      projectId,
      name: newKanbanName,
    });
    setNewKanbanName("");
  };

  return (
    <ColumnContainer>
      <form onSubmit={handleSubmit}>
        <Stack>
          <Input
            background="white"
            value={newKanbanName}
            onChange={(evt) => setNewKanbanName(evt.target.value)}
            placeholder="Kanban name"
          />

          <Button type="submit" colorScheme="teal">
            Create Kanban
          </Button>
        </Stack>
      </form>
    </ColumnContainer>
  );
};

export default CreateKanban;
