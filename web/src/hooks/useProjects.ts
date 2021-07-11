import { useCallback, useEffect } from "react";

import { db } from "@lib/firebase";
import { CollectionReference, DocumentData, Query } from "@firebase/firestore-types";
import useAsync from "@hooks/useAsync";
import { IProject } from "@components/screens/projects";

const useProjects = (param: Partial<IProject>) => {
  const { data: projects, isLoading, error, run, retry } = useAsync<IProject[]>();

  const listProjects = useCallback(async () => {
    type projectRefType = CollectionReference<DocumentData> | Query<DocumentData>;

    const items: IProject[] = [];

    let projectsRef: projectRefType = db.collection("projects");

    if (param.personId) {
      projectsRef = projectsRef.where("personId", "==", param.personId);
    }

    if (param.name) {
      projectsRef = projectsRef.where("name", "==", param.name);
    }

    const snapshots = await projectsRef.get();

    snapshots.forEach((doc) => {
      const data = doc.data();
      const created = data.created;
      items.push({ ...(data as Omit<IProject, "id" | "created">), id: doc.id, created });
    });

    return items;
  }, [param.name, param.personId]);

  useEffect(() => {
    run(listProjects(), { retry: listProjects });
  }, [param, run, listProjects]);

  return {
    projects,
    isLoading,
    error,
    retry,
  };
};

export default useProjects;
