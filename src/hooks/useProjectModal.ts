import useProject from "./useProject";
import useURLQueryParams from "./useURLQueryParams";

// Project Modal Global State Management (in URL)
const useProjectModal = () => {
  const [queryObject, setQueryObject] = useURLQueryParams(["projectCreate", "editProjectId"]);

  const open = () => setQueryObject({ projectCreate: true });

  const close = () => setQueryObject({ projectCreate: undefined, editProjectId: undefined });

  const { data: editingProject, isLoading } = useProject(
    queryObject.editProjectId as string | undefined,
  );

  const editProject = (id: string) => setQueryObject({ editProjectId: id });

  return {
    editProjectId: queryObject.editProjectId,
    editProject,
    editingProject,
    isLoading,
    projectCreate: queryObject.projectCreate,
    projectModalOpen: !!queryObject.projectCreate || !!queryObject.editProjectId,
    open,
    close,
  };
};

export default useProjectModal;
