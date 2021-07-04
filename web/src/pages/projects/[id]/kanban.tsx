import { FC } from "react";

import PageWithLayoutType from "@localTypes/pageWithLayout";
import Layout from "@components/layout";
import ProjectKanbanScreen from "@components/screens/project/kanban";

const ProjectKanbanPage: FC = () => {
  return <ProjectKanbanScreen />;
};

(ProjectKanbanPage as PageWithLayoutType).Layout = Layout;

export default ProjectKanbanPage;
