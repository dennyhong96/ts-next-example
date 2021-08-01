import { QueryKey, useMutation } from "react-query";

import { db } from "@lib/firebase";
import { useOptimisticDelete } from "./useOptimisticOptions";

const useDeleteProjects = (queryKey: QueryKey) => {
  return useMutation(
    (id: string) => db.collection("projects").doc(id).delete(),
    useOptimisticDelete(queryKey),
  );
};

export default useDeleteProjects;
