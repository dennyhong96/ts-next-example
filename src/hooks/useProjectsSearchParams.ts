import useURLQueryParams from "./useURLQueryParams";

const useProjectsSearchParams = () => {
  const [param, setParam] = useURLQueryParams(["name", "personId"]);

  return [param, setParam] as const;
};

export default useProjectsSearchParams;
