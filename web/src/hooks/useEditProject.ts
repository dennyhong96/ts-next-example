import { QueryKey, useMutation } from "react-query";

import { db } from "@lib/firebase";
import { useOptimisticEdit } from "./useOptimisticOptions";
import { IProject } from "@localTypes/projects";

const useEditProject = (queryKey: QueryKey) => {
  return useMutation((params: Partial<IProject>) => {
    const { id, ...restParams } = params;
    return db
      .collection("projects")
      .doc(id)
      .set({ ...restParams }, { merge: true });
  }, useOptimisticEdit(queryKey));
};

export default useEditProject;
