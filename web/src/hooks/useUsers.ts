import { db } from "@lib/firebase";
import useMount from "@hooks/useMount";

import useAsync from "./useAsync";
import { IUser } from "@localTypes/user";

const useUsers = () => {
  const { data: users, isLoading, error, run } = useAsync<IUser[]>();

  useMount(() =>
    run(
      (async () => {
        const snapshots = await db.collection("users").get();
        const items: IUser[] = [];

        snapshots.forEach((doc) => {
          items.push({ id: doc.id, ...(doc.data() as { name: string; email: string }) });
        });

        return items;
      })(),
    ),
  );

  return {
    users,
    isLoading,
    error,
  };
};

export default useUsers;
