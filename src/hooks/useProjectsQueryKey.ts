import useProjectsSearchParams from "./useProjectsSearchParams";

const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams();
  return ["projects", params];
};

export default useProjectsQueryKey;
