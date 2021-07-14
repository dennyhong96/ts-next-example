import { IProject } from "@components/screens/projects";
import { useMutation, useQueryClient } from "react-query";

import { db } from "@lib/firebase";

const useAddProject = () => {
  const client = useQueryClient();

  return useMutation(
    (params: Partial<IProject>) => {
      return db.collection("projects").add({ ...params });
    },
    {
      onSuccess() {
        client.invalidateQueries("projects");
      },
    },
  );
};

export default useAddProject;
