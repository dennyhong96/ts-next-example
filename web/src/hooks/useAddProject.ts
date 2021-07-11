import { IProject } from "@components/screens/projects";

import { db } from "@lib/firebase";
import useAsync from "@hooks/useAsync";

const useAddProject = () => {
  const { run, ...asyncRes } = useAsync();

  const mutate = async (params: Partial<IProject>) => {
    run(db.collection("projects").add({ ...params }));
  };

  return {
    mutate,
    ...asyncRes,
  };
};

export default useAddProject;
