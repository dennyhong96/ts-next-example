import { IProject } from "@components/screens/projects";
import { useMutation, useQueryClient } from "react-query";

import { db } from "@lib/firebase";

const useEditProject = () => {
  const client = useQueryClient();

  return useMutation(
    (params: Partial<IProject>) => {
      const { id, ...restParams } = params;
      return db
        .collection("projects")
        .doc(id)
        .set({ ...restParams }, { merge: true });
    },
    {
      onSuccess() {
        client.invalidateQueries("projects");
      },
    },
  );
};

export default useEditProject;
