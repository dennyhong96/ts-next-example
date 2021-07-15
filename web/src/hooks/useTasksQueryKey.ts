import useTasksSearchParams from "./useTasksSearchParams";

const useTasksQueryKey = () => {
  return ["tasks", useTasksSearchParams()];
};

export default useTasksQueryKey;
