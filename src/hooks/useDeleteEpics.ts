import { QueryKey, useMutation } from "react-query";

import { db } from "@lib/firebase";
import { useOptimisticDelete } from "./useOptimisticOptions";

const useDeleteEpics = (queryKey: QueryKey) => {
  return useMutation(
    (id: string) => db.collection("epics").doc(id).delete(),
    useOptimisticDelete(queryKey),
  );
};

export default useDeleteEpics;
