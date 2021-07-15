import { useProjectIdInUrl } from "./useProjectInUrl";

const useTasksSearchParams = () => ({ projectId: useProjectIdInUrl() });

export default useTasksSearchParams;
