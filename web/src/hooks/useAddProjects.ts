import { QueryKey, useMutation } from "react-query";

import { db } from "@lib/firebase";
import { useOptimisticCreate } from "./useOptimisticOptions";
import { IProject } from "@components/screens/projects";

const useAddProjects = (queryKey: QueryKey) => {
  return useMutation((params: Partial<IProject>) => {
    return db.collection("projects").add({ ...params, created: params.created ?? Date.now() });
  }, useOptimisticCreate(queryKey));
};

export default useAddProjects;
