import { FC } from "react";

import PageWithLayoutType from "@localTypes/pageWithLayout";
import Layout from "@components/layout";
import ProjectLayout from "@components/projectLayout";
import ProjectEpicScreen from "@components/screens/project/epic";

const ProjectEpicPage: FC = () => {
  return <ProjectEpicScreen />;
};

(ProjectEpicPage as PageWithLayoutType).Layout = Layout;
(ProjectEpicPage as PageWithLayoutType).SubLayout = ProjectLayout;

export default ProjectEpicPage;
