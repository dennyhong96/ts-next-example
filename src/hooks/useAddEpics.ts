import { QueryKey, useMutation } from "react-query";

import { db } from "@lib/firebase";
import { IEpic } from "@localTypes/epic";
import { useOptimisticCreate } from "./useOptimisticOptions";
import useEpicsSearchParams from "./useEpicsSearchParams";

export interface IAddEpicParams extends IEpic {
  newEpicId: string;
}

const useAddEpics = (queryKey: QueryKey) => {
  const { projectId } = useEpicsSearchParams();

  return useMutation(async (params: Partial<IAddEpicParams>) => {
    const { newEpicId, ...restParams } = params;

    return await db
      .collection("epics")
      .doc(newEpicId)
      .set({ ...restParams, projectId });
  }, useOptimisticCreate(queryKey));
};

export default useAddEpics;
