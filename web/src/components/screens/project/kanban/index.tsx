import { Fragment } from "react";
import { Heading, Stack } from "@chakra-ui/react";

import useKanbans from "@hooks/useKanbans";
import useProjectInUrl from "@hooks/useProjectInUrl";
import FullPageLoading from "@components/fullPageLoading";
import KanbanColumn from "./components/kanbanColumn";
import KanbanSearchPanel from "./components/kanbanSearchPanel";
import CreateKanban from "./components/createKanban";

const ProjectKanbanScreen = () => {
  const { project, isLoading: projectLoading } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbansLoading } = useKanbans();
  const isLoading = projectLoading || kanbansLoading;

  return (
    <Stack padding={4} spacing={4} height="100%">
      {isLoading ? (
        <FullPageLoading />
      ) : (
        <Fragment>
          <Heading>Kanban - {project?.name}</Heading>
          <KanbanSearchPanel />
          <Stack
            flex="1"
            direction="row"
            overflow="hidden"
            width="100%"
            spacing={4}
            overflowX="auto"
          >
            {kanbans?.map((kanban) => (
              <KanbanColumn key={kanban.id} kanban={kanban} />
            ))}

            <CreateKanban />
          </Stack>
        </Fragment>
      )}
    </Stack>
  );
};

export default ProjectKanbanScreen;
