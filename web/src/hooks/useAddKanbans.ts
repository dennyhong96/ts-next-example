import { QueryKey, useMutation } from "react-query";

import { db } from "@lib/firebase";
import { useOptimisticCreate } from "./useOptimisticOptions";
import { IKanban } from "@localTypes/kanban";

const useAddKanbans = (queryKey: QueryKey) => {
  return useMutation((params: Partial<IKanban>) => {
    return db.collection("kanbans").add({ ...params });
  }, useOptimisticCreate(queryKey));
};

export default useAddKanbans;
