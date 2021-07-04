import { FC } from "react";

import PageWithLayoutType from "@localTypes/pageWithLayout";
import Layout from "@components/layout";
import ProjectLayout from "@components/projectLayout";
import ProjectKanbanScreen from "@components/screens/project/kanban";

const ProjectKanbanPage: FC = () => {
  return <ProjectKanbanScreen />;
};

(ProjectKanbanPage as PageWithLayoutType).Layout = Layout;
(ProjectKanbanPage as PageWithLayoutType).SubLayout = ProjectLayout;

export default ProjectKanbanPage;
