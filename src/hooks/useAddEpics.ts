import { QueryKey, useMutation } from "react-query";

import { db } from "@lib/firebase";
import { IEpic } from "@localTypes/epic";
import { useOptimisticCreate } from "./useOptimisticOptions";
import useProjectInUrl from "./useProjectInUrl";

export interface IAddEpicParams extends IEpic {
  newEpicId: string;
}

const useAddEpics = (queryKey: QueryKey) => {
  const { project } = useProjectInUrl();

  return useMutation(async (params: Partial<IAddEpicParams>) => {
    if (!project) return;

    const { newEpicId, ...restParams } = params;

    return await db
      .collection("epics")
      .doc(newEpicId)
      .set({ ...restParams });
  }, useOptimisticCreate(queryKey));
};

export default useAddEpics;
