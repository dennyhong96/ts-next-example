import { QueryKey, useMutation } from "react-query";

import { db } from "@lib/firebase";
import { useOptimisticCreate } from "./useOptimisticOptions";
import { IKanban } from "@localTypes/kanban";
import useProjectInUrl from "./useProjectInUrl";

const useAddKanbans = (queryKey: QueryKey) => {
  const { project } = useProjectInUrl();

  return useMutation(async (params: Partial<IKanban>) => {
    if (!project) return;

    const newKanbanId = db.collection("kanbans").doc().id;

    // *** TODO: optimistic update addKanban and addTask, put new ids into order array
    return await Promise.all([
      db
        .collection("projects")
        .doc(project.id)
        .set({ kanbanIdsOrder: [...project.kanbanIdsOrder, newKanbanId] }, { merge: true }),
      db
        .collection("kanbans")
        .doc(newKanbanId)
        .set({ ...params }),
    ]);
  }, useOptimisticCreate(queryKey));
};

export default useAddKanbans;
