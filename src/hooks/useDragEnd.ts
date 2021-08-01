import { useCallback } from "react";
import { DropResult } from "react-beautiful-dnd";
import useKanbans from "./useKanbans";
import useProjectInUrl from "./useProjectInUrl";

import useReOrderKanbans from "./useReOrderKanbans";
import useReOrderTasks from "./useReOrderTasks";

const useDragEnd = () => {
  const { project } = useProjectInUrl();
  const { data: kanbans } = useKanbans();

  const { mutateAsync: reOrderKanbans } = useReOrderKanbans(project);
  const { mutateAsync: reOrderTasks } = useReOrderTasks(kanbans);

  return useCallback(
    async (dragResult: DropResult) => {
      const { source, destination, type, draggableId } = dragResult;

      if (!destination) return;

      // Handle kanbans (column) reorder
      if (type === "COLUMN") {
        const { index: sourceIndex } = source;
        const { index: destinationIndex } = destination;
        try {
          await reOrderKanbans({ sourceIndex, destinationIndex });
        } catch (error) {
          console.error(error);
        }
        return;
      }

      // Handle tasks (row) reorder
      if (type === "ROW") {
        const { index: sourceIndex, droppableId: draggedFromKanbanId } = source;
        const { index: destinationIndex, droppableId: droppedonKanbanId } = destination;
        return await reOrderTasks({
          sourceIndex,
          destinationIndex,
          draggedFromKanbanId,
          droppedonKanbanId,
          taskId: draggableId,
        });
      }
    },
    [reOrderKanbans, reOrderTasks],
  );
};

export default useDragEnd;
