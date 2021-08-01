import { QueryKey, useMutation } from "react-query";

import { db } from "@lib/firebase";
import { ITask } from "@localTypes/task";
import { useOptimisticCreate } from "./useOptimisticOptions";

const useAddTasks = (queryKey: QueryKey) => {
  return useMutation((params: Partial<ITask>) => {
    return db.collection("tasks").add({ ...params });
  }, useOptimisticCreate(queryKey));
};

export default useAddTasks;
