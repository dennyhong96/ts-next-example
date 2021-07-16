import { useCallback } from "react";
import { useQuery } from "react-query";

import { db } from "@lib/firebase";
import { CollectionReference, DocumentData, Query } from "@firebase/firestore-types";
import { IProject } from "@localTypes/projects";

const useProjects = (param?: Partial<IProject>) => {
  const listProjects = useCallback(async () => {
    type projectRefType = CollectionReference<DocumentData> | Query<DocumentData>;

    const items: IProject[] = [];

    let projectsRef: projectRefType = db.collection("projects");

    if (param) {
      (Object.keys(param) as (keyof typeof param)[]).forEach((key) => {
        if (param[key]) {
          projectsRef = projectsRef.where(key, "==", param[key]);
        }
      });
    }

    const snapshots = await projectsRef.get();

    snapshots.forEach((doc) => {
      const data = doc.data();
      const created = data.created;
      items.push({ ...(data as Omit<IProject, "id" | "created">), id: doc.id, created });
    });

    return items;
  }, [param]);

  return useQuery<IProject[], Error>(["projects", param], () => listProjects());
};

export default useProjects;
