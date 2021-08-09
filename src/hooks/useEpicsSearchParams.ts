import { useProjectIdInUrl } from "./useProjectInUrl";

const useEpicsSearchParams = () => ({ projectId: useProjectIdInUrl() });

export default useEpicsSearchParams;
