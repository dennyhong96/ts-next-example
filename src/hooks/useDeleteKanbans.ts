import { QueryKey, useMutation } from "react-query";

import { db } from "@lib/firebase";
import { useOptimisticDelete } from "./useOptimisticOptions";

const useDeleteKanbans = (queryKey: QueryKey) => {
  return useMutation(
    (id: string) => db.collection("kanbans").doc(id).delete(),
    useOptimisticDelete(queryKey),
  );
};

export default useDeleteKanbans;
