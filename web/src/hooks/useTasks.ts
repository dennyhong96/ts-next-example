import { useCallback } from "react";
import { useQuery } from "react-query";

import { CollectionReference, DocumentData, Query } from "@firebase/firestore-types";
import { db } from "@lib/firebase";
import { ITask } from "@localTypes/task";
import useTasksQueryKey from "./useTasksQueryKey";
import useTasksSearchParams from "./useTasksSearchParams";

const useTasks = () => {
  const [params] = useTasksSearchParams();

  const listTasks = useCallback(async () => {
    type tasksRefType = CollectionReference<DocumentData> | Query<DocumentData>;

    let tasksRef: tasksRefType = db.collection("tasks");

    if (params.projectId) {
      tasksRef = tasksRef.where("projectId", "==", params.projectId);
    }

    if (params.typeId) {
      tasksRef = tasksRef.where("typeId", "==", params.typeId);
    }

    if (params.processorId) {
      tasksRef = tasksRef.where("processorId", "==", params.processorId);
    }

    if (params.name) {
      tasksRef = tasksRef.where("name", "==", params.name);
    }

    const snapshots = await tasksRef.get();

    const items: ITask[] = [];

    snapshots.forEach((doc) => {
      const data = doc.data();
      items.push({ ...(data as Omit<ITask, "id">), id: doc.id });
    });

    return items;
  }, [params]);

  return useQuery<ITask[], Error>(["tasks", useTasksQueryKey()], () => listTasks());
};

export default useTasks;
