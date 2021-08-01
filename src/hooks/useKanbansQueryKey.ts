import useKanbansSearchParams from "./useKanbansSearchParams";

const useKanbansQueryKey = () => {
  return ["kanbans", useKanbansSearchParams()];
};

export default useKanbansQueryKey;
