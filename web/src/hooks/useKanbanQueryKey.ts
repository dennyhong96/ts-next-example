import useKanbansSearchParams from "./useKanbansSearchParams";

const useKanbanQueryKey = () => {
  return ["kanbans", useKanbansSearchParams()];
};

export default useKanbanQueryKey;
