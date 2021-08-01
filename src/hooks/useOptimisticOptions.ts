import { IProject } from "@localTypes/projects";
import { QueryKey, useQueryClient } from "react-query";

const useOptimisticOptions = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[],
) => {
  const client = useQueryClient();
  return {
    onSuccess() {
      client.invalidateQueries(queryKey);
    },
    async onMutate(target: any) {
      const previousItems = client.getQueryData(queryKey);
      client.setQueryData(queryKey, (old?: any[]) => callback(target, old));
      return { previousItems };
    },
    onError(error: any, newItem: any, context: any) {
      console.error(error);
      client.setQueryData(queryKey, () => context.previousItems);
    },
  };
};

export default useOptimisticOptions;

export const useOptimisticEdit = (queryKey: QueryKey) =>
  useOptimisticOptions(
    queryKey,
    (target, old) =>
      old?.map((item) => (item.id === target.id ? { ...item, ...target } : item)) ?? [],
  );

export const useOptimisticCreate = (queryKey: QueryKey) =>
  useOptimisticOptions(queryKey, (target, old) => (old ? [...old, target] : []));

export const useOptimisticDelete = (queryKey: QueryKey) =>
  useOptimisticOptions(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) ?? [],
  );

export const useOptimisticTaskReOrder = (queryKey: QueryKey) =>
  useOptimisticOptions(queryKey, (target, old) => {
    if (!old || !Array.isArray(old)) return [];

    const { sourceIndex, destinationIndex, draggedFromKanbanId, droppedonKanbanId, taskId } =
      target;

    if (
      !isFinite(sourceIndex) ||
      !isFinite(destinationIndex) ||
      !draggedFromKanbanId ||
      !droppedonKanbanId ||
      !taskId
    ) {
      return old;
    }

    // Re-order task within the same kanban
    if (draggedFromKanbanId === droppedonKanbanId) {
      const kanban = old.find((kb) => kb.id === draggedFromKanbanId);
      if (!kanban) return old;

      const taskIdsOrderCopy = [...kanban.taskIdsOrder];
      [taskIdsOrderCopy[sourceIndex], taskIdsOrderCopy[destinationIndex]] = [
        taskIdsOrderCopy[destinationIndex],
        taskIdsOrderCopy[sourceIndex],
      ];

      return old.map((kb) =>
        kb.id === kanban.id ? { ...kb, taskIdsOrder: taskIdsOrderCopy } : { ...kb },
      );
    }

    // Moved task from one kanban to another
    const sourceKanban = old.find((kb) => kb.id === draggedFromKanbanId);
    const destinationKanban = old.find((kb) => kb.id === droppedonKanbanId);

    if (!sourceKanban || !destinationKanban) return old;

    // Remove from old kanban
    const sourceTaskIdsCopy = [...sourceKanban.taskIdsOrder];
    const removedTaskIndex = sourceTaskIdsCopy.findIndex((tId) => tId === taskId);
    if (removedTaskIndex < 0 || removedTaskIndex !== sourceIndex) return old;

    sourceTaskIdsCopy.splice(removedTaskIndex, 1);

    // NOTE: This is wrong, never mutate cache
    // sourceKanban.taskIdsOrder = sourceTaskIdsCopy;

    // Insert into new kanban
    const destinationTaskIdsCopy = [...destinationKanban.taskIdsOrder];
    destinationTaskIdsCopy.splice(destinationIndex, 0, taskId);

    return old.map((kb) =>
      kb.id === sourceKanban.id
        ? { ...kb, taskIdsOrder: sourceTaskIdsCopy }
        : kb.id === destinationKanban.id
        ? { ...kb, taskIdsOrder: destinationTaskIdsCopy }
        : { ...kb },
    );
  });

export const useOptimisticKanbanReOrder = (queryKey: QueryKey) =>
  // @ts-ignore
  useOptimisticOptions(queryKey, (target, old: IProject) => {
    if (!old?.kanbanIdsOrder) return {};

    const { sourceIndex, destinationIndex } = target;

    if (!isFinite(sourceIndex) || !isFinite(destinationIndex)) return;

    const { kanbanIdsOrder } = old;
    const kanbanIdsOrderCopy = [...kanbanIdsOrder];

    // Swap orders
    [kanbanIdsOrderCopy[sourceIndex], kanbanIdsOrderCopy[destinationIndex]] = [
      kanbanIdsOrderCopy[destinationIndex],
      kanbanIdsOrderCopy[sourceIndex],
    ];

    return {
      ...old,
      kanbanIdsOrder: kanbanIdsOrderCopy,
    };
  });
