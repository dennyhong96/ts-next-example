import { Heading, Stack } from "@chakra-ui/react";

import useKanbans from "@hooks/useKanbans";
import useProjectInUrl from "@hooks/useProjectInUrl";
import FullPageLoading from "@components/fullPageLoading";
import KanbanColumn from "./components/kanbanColumn";
import KanbanSearchPanel from "./components/kanbanSearchPanel";
import CreateKanban from "./components/createKanban";
import { DragDropContext } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "@components/dragAndDrop";

const ProjectKanbanScreen = () => {
  const { project, isLoading: projectLoading } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbansLoading } = useKanbans();
  const isLoading = projectLoading || kanbansLoading;

  return (
    // TODO: Persist dnd
    <DragDropContext onDragEnd={() => null}>
      <Stack padding={4} spacing={4} height="100%">
        {isLoading ? (
          <FullPageLoading />
        ) : (
          <Drop type="COLUMN" direction="horizontal" droppableId="kanban">
            {/* TODO: Support passing styles to DropChild */}
            <DropChild>
              <Heading>Kanban - {project?.name}</Heading>
              <KanbanSearchPanel />
              <Stack
                flex={1}
                flexShrink={0}
                direction="row"
                overflow="hidden"
                width="100%"
                spacing={4}
                overflowX="auto"
              >
                {kanbans?.map((kanban, index) => (
                  <Drag key={kanban.id} draggableId={`kanban-${kanban.id}`} index={index}>
                    <KanbanColumn kanban={kanban} />
                  </Drag>
                ))}

                <CreateKanban />
              </Stack>
            </DropChild>
          </Drop>
        )}
      </Stack>
    </DragDropContext>
  );
};

export default ProjectKanbanScreen;
