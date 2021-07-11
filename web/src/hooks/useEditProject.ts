import { IProject } from "@components/screens/projects";

import { db } from "@lib/firebase";
import useAsync from "@hooks/useAsync";

const useEditProject = () => {
  const { run, ...asyncRes } = useAsync();

  const mutate = (params: Partial<IProject>) => {
    const { id, ...restParams } = params;
    run(
      db
        .collection("projects")
        .doc(id)
        .set({ ...restParams }, { merge: true }),
    );
  };

  return {
    mutate,
    ...asyncRes,
  };
};

export default useEditProject;
