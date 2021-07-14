import { useQuery } from "react-query";

import { db } from "@lib/firebase";
import { IProject } from "@components/screens/projects";

const useProject = (id?: string) =>
  useQuery<IProject, Error>(
    ["project", id],
    () =>
      db
        .collection("projects")
        .doc(id)
        .get()
        .then((doc) => ({ ...doc.data(), id: doc.id } as IProject)),
    { enabled: !!id },
  );

export default useProject;
