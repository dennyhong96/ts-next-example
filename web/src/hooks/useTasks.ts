import { useCallback } from "react";
import { useQuery } from "react-query";

import { CollectionReference, DocumentData, Query } from "@firebase/firestore-types";
import { db } from "@lib/firebase";
import { ITask } from "@localTypes/task";
import useTasksQueryKey from "./useTasksQueryKey";
import useTasksSearchParams from "./useTasksSearchParams";

// TODO: debounce task name param
const useTasks = () => {
  const [params] = useTasksSearchParams();

  const listTasks = useCallback(async () => {
    type tasksRefType = CollectionReference<DocumentData> | Query<DocumentData>;

    let tasksRef: tasksRefType = db.collection("tasks");

    (Object.keys(params) as (keyof typeof params)[]).forEach((key) => {
      if (params[key]) {
        tasksRef = tasksRef.where(key, "==", params[key]);
      }
    });

    const snapshots = await tasksRef.get();

    const items: ITask[] = [];

    snapshots.forEach((doc) => {
      const data = doc.data();
      items.push({ ...(data as Omit<ITask, "id">), id: doc.id });
    });

    return items;
  }, [params]);

  return useQuery<ITask[], Error>(useTasksQueryKey(), () => listTasks());
};

export default useTasks;
