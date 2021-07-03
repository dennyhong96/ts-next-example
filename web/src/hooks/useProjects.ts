import { useEffect } from "react";

import { db } from "@lib/firebase";
import { CollectionReference, DocumentData, Query } from "@firebase/firestore-types";
import useDebounce from "@hooks/useDebounce";
import useAsync from "@hooks/useAsync";
import { IProject } from "@components/screens/projects";

const useProjects = (param: Partial<IProject>) => {
  const { data: projects, isLoading, error, run } = useAsync<IProject[]>();

  const debouncedParam = useDebounce(param, 200);

  useEffect(() => {
    run(
      (async () => {
        type projectRefType = CollectionReference<DocumentData> | Query<DocumentData>;

        const items: IProject[] = [];

        let projectsRef: projectRefType = db.collection("projects");

        if (debouncedParam.personId) {
          projectsRef = projectsRef.where("personId", "==", debouncedParam.personId);
        }

        if (debouncedParam.name) {
          projectsRef = projectsRef.where("name", "==", debouncedParam.name);
        }

        const snapshots = await projectsRef.get();

        snapshots.forEach((doc) => {
          const data = doc.data();
          const created = data.created;
          items.push({ ...(data as Omit<IProject, "id" | "created">), id: doc.id, created });
        });

        return items;
      })(),
    );

    // eslint-disable-next-line
  }, [debouncedParam]);

  return {
    projects,
    isLoading,
    error,
  };
};

export default useProjects;
