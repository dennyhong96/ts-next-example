import useTask from "./useTask";
import useURLQueryParams from "./useURLQueryParams";

const useTaskModal = () => {
  const [queryObject, setQueryObject] = useURLQueryParams(["editTaskId"]);

  const { data: editingTask, isLoading } = useTask(queryObject.editTaskId as string | undefined);

  const open = (id: string) => setQueryObject({ editTaskId: id });

  const close = () => setQueryObject({ editTaskId: undefined });

  return {
    taskModalOpen: !!queryObject.editTaskId,
    open,
    close,
    editingTask,
    isLoading,
  };
};

export default useTaskModal;
