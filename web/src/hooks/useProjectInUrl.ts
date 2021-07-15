import { useRouter } from "next/router";
import useProject from "./useProject";

export const useProjectIdInUrl = () => {
  const router = useRouter();
  return router.query.id as string;
};

const useProjectInUrl = () => {
  const { data: project } = useProject(useProjectIdInUrl());
  return {
    project,
  };
};

export default useProjectInUrl;
