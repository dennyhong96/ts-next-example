import { Heading, Stack } from "@chakra-ui/react";

import useKanbans from "@hooks/useKanbans";
import useProjectInUrl from "@hooks/useProjectInUrl";
import KanbanColumn from "./components/kanbanColumn";

const ProjectKanbanScreen = () => {
  const { project } = useProjectInUrl();

  const { data: kanbans } = useKanbans();

  console.log({ kanbans });

  return (
    <div>
      <Heading>{project?.name} Kanban</Heading>
      <Stack direction="row" overflow="hidden" spacing={4}>
        {kanbans?.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </Stack>
    </div>
  );
};

export default ProjectKanbanScreen;
