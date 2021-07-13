import useURLQueryParams from "./useURLQueryParams";

// Project Modal Global State Management (in URL)
const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useURLQueryParams(["projectCreate"]);

  const open = () => setProjectCreate({ projectCreate: true });

  const close = () => setProjectCreate({ projectCreate: false });

  // return [projectCreate === "true", open, close] as const;

  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
  };
};

export default useProjectModal;
