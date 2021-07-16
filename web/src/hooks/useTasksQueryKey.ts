import useTasksSearchParams from "./useTasksSearchParams";

const useTasksQueryKey = () => {
  const [params] = useTasksSearchParams();
  return ["tasks", params];
};

export default useTasksQueryKey;
