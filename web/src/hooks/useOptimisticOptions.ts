import { QueryKey, useQueryClient } from "react-query";

const useOptimisticOptions = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[],
) => {
  const client = useQueryClient();
  return {
    onSuccess() {
      client.invalidateQueries(queryKey);
    },
    async onMutate(target: any) {
      const previousItems = client.getQueryData(queryKey);
      client.setQueryData(queryKey, (old?: any[]) => callback(target, old));
      return { previousItems };
    },
    onError(error: any, newItem: any, context: any) {
      client.setQueryData(queryKey, () => context.previousItems);
    },
  };
};

export default useOptimisticOptions;

export const useOptimisticEdit = (queryKey: QueryKey) =>
  useOptimisticOptions(
    queryKey,
    (target, old) =>
      old?.map((item) => (item.id === target.id ? { ...item, ...target } : item)) ?? [],
  );

export const useOptimisticCreate = (queryKey: QueryKey) =>
  useOptimisticOptions(queryKey, (target, old) => (old ? [...old, target] : []));

export const useOptimisticDelete = (queryKey: QueryKey) =>
  useOptimisticOptions(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) ?? [],
  );
