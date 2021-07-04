import { FC } from "react";

import PageWithLayoutType from "@localTypes/pageWithLayout";
import Layout from "@components/layout";
import ProjectsScreen from "@components/screens/projects";

const Home: FC = () => {
  return <ProjectsScreen />;
};

(Home as PageWithLayoutType).Layout = Layout;

export default Home;
