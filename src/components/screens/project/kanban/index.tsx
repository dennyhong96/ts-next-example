import { DragDropContext } from "react-beautiful-dnd";
import { Box, Heading, Stack } from "@chakra-ui/react";

import useKanbans from "@hooks/useKanbans";
import useProjectInUrl from "@hooks/useProjectInUrl";
import FullPageLoading from "@components/fullPageLoading";
import KanbanColumn from "./components/kanbanColumn";
import KanbanSearchPanel from "./components/kanbanSearchPanel";
import CreateKanban from "./components/createKanban";
import { Drag, Drop, DropChild } from "@components/dragAndDrop";

const ProjectKanbanScreen = () => {
  const { project, isLoading: projectLoading } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbansLoading } = useKanbans();
  const isLoading = projectLoading || kanbansLoading;

  return (
    // TODO: Persist dnd
    <DragDropContext onDragEnd={() => null}>
      <Box height="100%" display="flex" flexDirection="column">
        <Stack padding={4} spacing={4}>
          <Heading>Kanban - {project?.name}</Heading>
          <KanbanSearchPanel />
        </Stack>
        {isLoading ? (
          <FullPageLoading />
        ) : (
          <Stack padding={4} spacing={4} height="100%" direction="row" overflowX="auto" flex={1}>
            <Drop type="COLUMN" direction="horizontal" droppableId="kanban">
              {/* TODO: Support passing styles to DropChild */}
              <DropChild style={{ height: "100%", display: "flex" }}>
                <Stack flex={1} direction="row">
                  {kanbans?.map((kanban, index) => (
                    <Drag key={kanban.id} draggableId={`kanban-${kanban.id}`} index={index}>
                      <KanbanColumn kanban={kanban} />
                    </Drag>
                  ))}
                </Stack>
              </DropChild>
            </Drop>

            {/* This needs to be outside Drop, otherwise the dnd items will collapse with it during drag */}
            <CreateKanban />
          </Stack>
        )}
      </Box>
    </DragDropContext>
  );
};

export default ProjectKanbanScreen;
