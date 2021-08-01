import { QueryKey, useMutation } from "react-query";

import { db } from "@lib/firebase";
import { useOptimisticAddKanban } from "./useOptimisticOptions";
import { IKanban } from "@localTypes/kanban";
import useProjectInUrl from "./useProjectInUrl";

export interface IAddKanbanParams extends IKanban {
  newKanbanId: string;
}

const useAddKanbans = (queryKey: QueryKey) => {
  const { project } = useProjectInUrl();

  return useMutation(async (params: Partial<IAddKanbanParams>) => {
    if (!project) return;

    const { newKanbanId, ...restParams } = params;

    return await Promise.all([
      db
        .collection("projects")
        .doc(project.id)
        .set({ kanbanIdsOrder: [...project.kanbanIdsOrder, newKanbanId] }, { merge: true }),
      db
        .collection("kanbans")
        .doc(newKanbanId)
        .set({ ...restParams }),
    ]);
  }, useOptimisticAddKanban(queryKey));
};

export default useAddKanbans;
