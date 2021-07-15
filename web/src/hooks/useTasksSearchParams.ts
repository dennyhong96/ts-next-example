import { useMemo } from "react";

import { useProjectIdInUrl } from "./useProjectInUrl";
import useURLQueryParams from "./useURLQueryParams";

const useTasksSearchParams = () => {
  const [params, setParams] = useURLQueryParams(["name", "typeId", "processorId", "tagId"]);
  const projectId = useProjectIdInUrl();

  return [
    useMemo(
      () => ({
        projectId,
        typeId: params.typeId as string | undefined,
        processorId: params.processorId as string | undefined,
        tagId: params.tagId as string | undefined,
        name: params.name as string | undefined,
      }),
      [projectId, params],
    ),
    setParams,
  ] as const;
};

export default useTasksSearchParams;
