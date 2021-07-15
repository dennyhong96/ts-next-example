import { FC, Fragment } from "react";
import Head from "next/head";

import PageWithLayoutType from "@localTypes/pageWithLayout";
import Layout from "@components/layout";
import ProjectLayout from "@components/projectLayout";
import ProjectKanbanScreen from "@components/screens/project/kanban";

const ProjectKanbanPage: FC = () => {
  return (
    <Fragment>
      <Head>
        <title>Kanbans</title>
      </Head>
      <ProjectKanbanScreen />
    </Fragment>
  );
};

(ProjectKanbanPage as PageWithLayoutType).Layout = Layout;
(ProjectKanbanPage as PageWithLayoutType).SubLayout = ProjectLayout;

export default ProjectKanbanPage;
