import { Heading, Stack, Box } from "@chakra-ui/react";

import useKanbans from "@hooks/useKanbans";
import useProjectInUrl from "@hooks/useProjectInUrl";
import KanbanColumn from "./components/kanbanColumn";
import KanbanSearchPanel from "./components/kanbanSearchPanel";

const ProjectKanbanScreen = () => {
  const { project } = useProjectInUrl();

  const { data: kanbans } = useKanbans();

  return (
    <Box padding={4}>
      <Heading>{project?.name} Kanban</Heading>
      <KanbanSearchPanel />
      <Stack direction="row" overflow="hidden" width="100%" spacing={4} overflowX="auto">
        {kanbans?.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </Stack>
    </Box>
  );
};

export default ProjectKanbanScreen;
