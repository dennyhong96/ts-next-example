import { useMutation } from "react-query";

import { db } from "@lib/firebase";
import { useOptimisticTaskReOrder } from "./useOptimisticOptions";
import useKanbansQueryKey from "./useKanbansQueryKey";
import { IKanban } from "@localTypes/kanban";

interface IReOrderTasks {
  sourceIndex: number;
  destinationIndex: number;
  draggedFromKanbanId: string;
  droppedonKanbanId: string;
  taskId: string;
}

const useReOrderTasks = (kanbans: IKanban[] | undefined) => {
  return useMutation(async (reOrderTaskParams: IReOrderTasks) => {
    const { sourceIndex, destinationIndex, draggedFromKanbanId, droppedonKanbanId, taskId } =
      reOrderTaskParams;

    if (
      !kanbans ||
      !isFinite(sourceIndex) ||
      !isFinite(destinationIndex) ||
      !draggedFromKanbanId ||
      !droppedonKanbanId ||
      !taskId
    ) {
      return;
    }

    // Re-order task within the same kanban
    if (draggedFromKanbanId === droppedonKanbanId) {
      if (sourceIndex === destinationIndex) return; // Didn't move

      const kanban = kanbans.find((kb) => kb.id === draggedFromKanbanId);
      if (!kanban) return;

      const taskIdsOrderCopy = [...kanban.taskIdsOrder];
      [taskIdsOrderCopy[sourceIndex], taskIdsOrderCopy[destinationIndex]] = [
        taskIdsOrderCopy[destinationIndex],
        taskIdsOrderCopy[sourceIndex],
      ];

      return db
        .collection("kanbans")
        .doc(kanban.id)
        .set({ taskIdsOrder: taskIdsOrderCopy }, { merge: true });
    }

    // Moved task from one kanban to another
    const sourceKanban = kanbans.find((kb) => kb.id === draggedFromKanbanId);
    const destinationKanban = kanbans.find((kb) => kb.id === droppedonKanbanId);

    if (!sourceKanban || !destinationKanban) return;

    // Remove from old kanban
    const sourceTaskIdsCopy = [...sourceKanban.taskIdsOrder];
    const removedTaskIndex = sourceTaskIdsCopy.findIndex((tId) => tId === taskId);
    if (removedTaskIndex < 0 || removedTaskIndex !== sourceIndex) return;
    sourceTaskIdsCopy.splice(removedTaskIndex, 1);

    // Insert into new kanban
    const destinationTaskIdsCopy = [...destinationKanban.taskIdsOrder];
    destinationTaskIdsCopy.splice(destinationIndex, 0, taskId);

    // Save
    return await Promise.all([
      db
        .collection("kanbans")
        .doc(draggedFromKanbanId)
        .set({ taskIdsOrder: sourceTaskIdsCopy }, { merge: true }),
      db
        .collection("kanbans")
        .doc(droppedonKanbanId)
        .set({ taskIdsOrder: destinationTaskIdsCopy }, { merge: true }),
    ]);
  }, useOptimisticTaskReOrder(useKanbansQueryKey()));
};

export default useReOrderTasks;
