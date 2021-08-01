import { QueryKey, useMutation } from "react-query";

import { db } from "@lib/firebase";
import { ITask } from "@localTypes/task";
import { useOptimisticAddTask } from "./useOptimisticOptions";
import useKanbans from "./useKanbans";

export interface IAddTaskParams extends ITask {
  newTaskId: string;
}

const useAddTasks = (queryKey: QueryKey) => {
  const { data: kanbans } = useKanbans();

  return useMutation(async (params: Partial<IAddTaskParams>) => {
    const { newTaskId, ...restParams } = params;

    const kanban = kanbans?.find((kb) => kb.id === restParams.kanbanId);

    if (!kanban) return;

    return await Promise.all([
      db
        .collection("kanbans")
        .doc(restParams.kanbanId)
        .set({ taskIdsOrder: [...kanban.taskIdsOrder, newTaskId] }, { merge: true }),
      db
        .collection("tasks")
        .doc(newTaskId)
        .set({ ...restParams }),
    ]);
  }, useOptimisticAddTask(queryKey));
};

export default useAddTasks;
