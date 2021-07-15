import useTasksSearchParams from "./useTasksSearchParams";

const useTasksQueryKey = () => {
  return ["tasks", useTasksSearchParams()[0]];
};

export default useTasksQueryKey;
