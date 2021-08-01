import { QueryKey, useMutation } from "react-query";

import { ITask } from "@localTypes/task";
import { db } from "@lib/firebase";
import { useOptimisticEdit } from "./useOptimisticOptions";

const useEditTask = (queryKey: QueryKey) => {
  return useMutation((params: Partial<ITask>) => {
    const { id, ...restParams } = params;
    return db
      .collection("tasks")
      .doc(id)
      .set({ ...restParams }, { merge: true });
  }, useOptimisticEdit(queryKey));
};

export default useEditTask;
