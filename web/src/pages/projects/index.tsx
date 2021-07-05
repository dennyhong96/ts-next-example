import { FC } from "react";
import Head from "next/head";

import PageWithLayoutType from "@localTypes/pageWithLayout";
import Layout from "@components/layout";
import ProjectsScreen from "@components/screens/projects";
import { Fragment } from "react";

const ProjectsPage: FC = () => {
  return (
    <Fragment>
      <Head>
        <title>Project Management</title>
      </Head>
      <ProjectsScreen />
    </Fragment>
  );
};

(ProjectsPage as PageWithLayoutType).Layout = Layout;

export default ProjectsPage;