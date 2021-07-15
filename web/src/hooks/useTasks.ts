import { useCallback } from "react";
import { useQuery } from "react-query";

import { CollectionReference, DocumentData, Query } from "@firebase/firestore-types";
import { db } from "@lib/firebase";
import { ITask } from "@localTypes/task";

const useTasks = ({ kanbanId, enabled = true }: { kanbanId?: string; enabled?: boolean }) => {
  const listTasks = useCallback(async () => {
    type tasksRefType = CollectionReference<DocumentData> | Query<DocumentData>;

    let tasksRef: tasksRefType = db.collection("tasks");

    if (kanbanId) {
      tasksRef = tasksRef.where("kanbanId", "==", kanbanId);
    }

    const snapshots = await tasksRef.get();

    const items: ITask[] = [];

    snapshots.forEach((doc) => {
      const data = doc.data();
      items.push({ ...(data as Omit<ITask, "id">), id: doc.id });
    });

    return items;
  }, [kanbanId]);

  return useQuery<ITask[], Error>(["tasks", { kanbanId }], () => listTasks(), {
    enabled,
  });
};

export default useTasks;
