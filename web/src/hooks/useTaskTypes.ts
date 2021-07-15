import { db } from "@lib/firebase";
import { ITaskType } from "@localTypes/taskType";
import { useQuery } from "react-query";

const useTaskTypes = () => {
  return useQuery<ITaskType[], Error>(["tasksTypes"], async () => {
    const taskTypes: ITaskType[] = [];
    const snapshots = await db.collection("taskTypes").get();
    snapshots.forEach((doc) => {
      taskTypes.push({ ...(doc.data() as Omit<ITaskType, "id">), id: doc.id });
    });
    return taskTypes;
  });
};

export default useTaskTypes;
