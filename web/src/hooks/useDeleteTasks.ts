import { QueryKey, useMutation } from "react-query";

import { db } from "@lib/firebase";
import { useOptimisticDelete } from "./useOptimisticOptions";

const useDeleteTasks = (queryKey: QueryKey) => {
  return useMutation(
    (id: string) => db.collection("tasks").doc(id).delete(),
    useOptimisticDelete(queryKey),
  );
};

export default useDeleteTasks;
