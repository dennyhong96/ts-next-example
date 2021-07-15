import { useProjectIdInUrl } from "./useProjectInUrl";

const useKanbansSearchParams = () => ({ projectId: useProjectIdInUrl() });

export default useKanbansSearchParams;
