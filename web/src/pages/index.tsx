import { FC } from "react";
import Head from "next/head";

import PageWithLayoutType from "@localTypes/pageWithLayout";
import Layout from "@components/layout";
import ProjectsScreen from "@components/screens/projects";
import { Fragment } from "react";

const Home: FC = () => {
  return (
    <Fragment>
      <Head>
        <title>Project Management</title>
      </Head>
      <ProjectsScreen />
    </Fragment>
  );
};

(Home as PageWithLayoutType).Layout = Layout;

export default Home;
