import { useQuery } from "react-query";

import { db } from "@lib/firebase";
import { ITask } from "@localTypes/task";

const useTask = (id?: string) => {
  return useQuery<ITask, Error>(
    ["task", id],
    () =>
      db
        .collection("tasks")
        .doc(id)
        .get()
        .then((doc) => ({ ...doc.data(), id: doc.id } as ITask)),
    {
      enabled: !!id,
    },
  );
};

export default useTask;
