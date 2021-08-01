import { useMutation } from "react-query";

import { db } from "@lib/firebase";
import { useOptimisticKanbanReOrder } from "./useOptimisticOptions";
import { IProject } from "@localTypes/projects";

const useReOrderKanbans = (project: IProject | undefined) => {
  return useMutation(
    async ({
      sourceIndex,
      destinationIndex,
    }: {
      sourceIndex: number;
      destinationIndex: number;
    }) => {
      if (
        !project ||
        !project.kanbanIdsOrder ||
        !isFinite(sourceIndex) ||
        !isFinite(destinationIndex) ||
        sourceIndex === destinationIndex
      ) {
        return;
      }

      const { kanbanIdsOrder, id } = project;

      const kanbanIdsOrderCopy = [...kanbanIdsOrder];

      // Swap orders
      [kanbanIdsOrderCopy[sourceIndex], kanbanIdsOrderCopy[destinationIndex]] = [
        kanbanIdsOrderCopy[destinationIndex],
        kanbanIdsOrderCopy[sourceIndex],
      ];

      return await db
        .collection("projects")
        .doc(id)
        .set({ kanbanIdsOrder: kanbanIdsOrderCopy }, { merge: true });
    },
    useOptimisticKanbanReOrder(["project", project?.id]),
  );
};

export default useReOrderKanbans;
