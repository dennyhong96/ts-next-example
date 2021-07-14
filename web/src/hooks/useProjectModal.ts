import useURLQueryParams from "./useURLQueryParams";

// Project Modal Global State Management (in URL)
const useProjectModal = () => {
  const [queryObject, setQueryObject] = useURLQueryParams(["projectCreate"]);

  const open = () => setQueryObject({ projectCreate: true });

  const close = () => setQueryObject({ projectCreate: undefined });

  // return [projectCreate === "true", open, close] as const;

  return {
    projectCreate: queryObject.projectCreate,
    projectModalOpen: !!queryObject.projectCreate,
    open,
    close,
  };
};

export default useProjectModal;
