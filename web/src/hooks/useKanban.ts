import { useCallback } from "react";
import { useQuery } from "react-query";

import { db } from "@lib/firebase";
import { IKanban } from "@localTypes/kanban";

const useProjects = () => {
  const listProjects = useCallback(async () => {
    const snapshots = await db.collection("kanbans").get();

    const items: IKanban[] = [];

    snapshots.forEach((doc) => {
      const data = doc.data();
      items.push({ ...(data as Omit<IKanban, "id">), id: doc.id });
    });

    return items;
  }, []);

  return useQuery<IKanban[], Error>(["kanbans"], () => listProjects());
};

export default useProjects;
